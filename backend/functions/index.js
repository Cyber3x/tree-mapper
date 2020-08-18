require('dotenv').config({ path: 'D:/Programming/WebDev/TreeMapper/.env' });
const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
app.use(cors());
const FBAuth = require('./util/fbAuth');

const {
  getTrees,
  addTree,
  deleteTree,
  updateTreeData,
} = require('./handlers/trees');
const { signup, login } = require('./handlers/auth');

app.get('/trees', getTrees);

app.post('/tree', FBAuth, addTree);
app.delete('/tree/:treeId', FBAuth, deleteTree);
app.post('/tree/:treeId', FBAuth, updateTreeData);

// TOOD: build a proper backend then put in works
app.post('/signup', signup);
app.post('/login', login);
//update user details

const region = 'europe-west3';
exports.api = functions.region(region).https.onRequest(app);
