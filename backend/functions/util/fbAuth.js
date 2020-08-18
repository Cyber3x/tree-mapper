const { admin, db } = require('./modules');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let idToken;
  if (authorization && authorization.startsWith('Bearer ')) {
    idToken = authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return res.status(403).json({ error: 'Unauthorized, no token found' });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      return db.doc(`/users/${req.user.uid}`).get();
    })
    .then(() => next())
    .catch(err => {
      console.error('Error while verifying token', err);
      return res.status(403).json(err);
    });
};
