const { db } = require('../util/admin');
const { firebase } = require('../util/firebase');

const { validateSignupData, validateLoginData } = require('../util/validators');

exports.signup = (req, res) => {
  const { email, password, handle, accessCode } = req.body;

  const { valid, errors } = validateSignupData(req.body);
  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.collection('users')
    .where('handle', '==', handle)
    .limit(1)
    .get()
    .then(data => {
      if (data.docs[0]) {
        return res.status(400).json({ handle: 'This handle is already taken' });
      } else if (accessCode !== 'TreeMapper') {
        return res
          .status(400)
          .json({ accessCode: "You don't have the right access code" });
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
          })
          .then(idToken => {
            token = idToken;
            const userCredentials = {
              email,
              handle,
              createdAt: new Date().toISOString(),
            };
            return db.doc(`/users/${userId}`).set(userCredentials);
          })
          .then(() => res.status(201).json({ token }))
          .catch(err => {
            if (err.code === 'auth/email-already-in-use') {
              return res.status(400).json({ email: 'Email is already in use' });
            }
            console.error(err);
            return res
              .status(500)
              .json({ general: 'Something went wronge, please try again' });
          });
      }
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const { valid, errors } = validateLoginData(req.body);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => data.user.getIdToken())
    .then(token => res.json({ token }))
    .catch(err => {
      console.error(err);
      return res
        .status(403)
        .json({ general: 'Wrong credentials, please try again' });
    });
};
