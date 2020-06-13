const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
db = admin.firestore();

module.exports = { admin, db };
