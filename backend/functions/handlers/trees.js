const { db, storage } = require('../util/admin');

const {
  validateNewTreeData,
  validateUpdateTreeData,
} = require('../util/validators');

exports.getTrees = (req, res) => {
  db.collection('trees')
    .get()
    .then(data => {
      let trees = [];
      data.forEach(doc => {
        treeData = doc.data();
        treeData.treeId = doc.id;
        trees.push(treeData);
      });
      return res.json(trees);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'an error has occured while getting trees' });
      console.error(err);
    });
};

exports.addTree = (req, res) => {
  const Busboy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new Busboy({ headers: req.headers });

  const newTreeData = {};
  let imageFileName;
  let imageToBeUploaded;

  busboy.on('file', (fieldname, file, fileName, encoding, mimetype) => {
    if (
      mimetype !== 'image/jpeg' &&
      mimetype !== 'image/png' &&
      mimetype !== 'image/jpg'
    ) {
      return res.status(400).json({ image: 'Not a valid file type' });
    }
    const imageExtension = fileName.split('.')[fileName.split('.').length - 1];
    imageFileName = `${Math.floor(
      Math.random() * 1000000000
    )}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    newTreeData.image = imageToBeUploaded;
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('field', (fieldname, val) => {
    newTreeData[fieldname] = val;
  });
  busboy.on('finish', () => {
    const { valid, errors } = validateNewTreeData(newTreeData);
    if (!valid) res.status(400).json(errors);

    newTreeData.location = JSON.parse(newTreeData.location);
    // upload image to storage
    storage
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/treemapper-gfg.appspot.com/o/${imageFileName}?alt=media`;
        newTreeData.image = imageUrl;
        (newTreeData.createdBy = req.user.uid),
          (newTreeData.createdAt = new Date().toISOString());
        return db.collection('trees').add(newTreeData);
      })
      .then(doc => {
        newTreeData.treeId = doc.id;
        res.status(201).json(newTreeData);
      })
      .catch(err => {
        res.status(500).json({ error: 'Errow while adding new tree' });
        console.error(err);
      });
  });
  busboy.end(req.rawBody);

  // const { valid, errors } = validateTreeData(req.body);
  // if (!valid) return res.status(400).json(errors);

  // const newTree = {
  //   title,
  //   plantedAt,
  //   location,
  //   createdAt: new Date().toISOString(),
  //   createdBy: req.user.uid,
  // };

  // db.collection('trees')
  //   .add(newTree)
  //   .then(doc => {
  //     const resTreeData = newTree;
  //     resTreeData.treeId = doc.id;
  //     res.json(resTreeData);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ error: 'Errow while adding new tree' });
  //     console.error(err);
  //   });
};

exports.deleteTree = (req, res) => {
  const treeId = req.params.treeId;
  const treeDoc = db.doc(`/trees/${treeId}`);
  let treeImageName;
  treeDoc
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Tree not found' });
      }
      if (doc.data().createdBy !== req.user.uid) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        const regEx = /[0-9]*\.(?:jpeg|png|jpg)/;
        const match = doc.data().image.match(regEx);
        treeImageName = match[0];
        return treeDoc.delete();
      }
    })
    .then(() => {
      return admin.storage().bucket().file(treeImageName).delete();
    })
    .then(() => res.json({ message: 'Tree deleted successfully' }))
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateTreeData = (req, res) => {
  /*
  {
    desc: string
    plantedAt: isoString
    location: [lat: float | int >= -90 && <= 90, long: float | int >= -180 && <= 180]

    return message | error
  }
  */
  const treeId = req.params.treeId;
  const { description, plantedAt, location } = req.body;

  const { valid, errors } = validateUpdateTreeData(req.body);
  if (!valid) return res.status(400).json(errors);

  const treeDoc = db.doc(`/trees/${treeId}`);
  treeDoc
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Tree not found' });
      }
      if (doc.data().createdBy !== req.user.uid) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return treeDoc.update(req.body);
        // FIXME: if new data is the same as the old one deny the update
      }
    })
    .then(() => res.json({ message: 'Tree details updated sucecessfully' }))
    .catch(err => {
      confirm.error(err);
      return res.status(500).json({ error: err.code });
    });
};
