const admin = require('firebase-admin');

admin.initializeApp();
db = admin.firestore();
auth = admin.auth();
storage = admin.storage();

module.exports = { admin, db, auth, storage };
