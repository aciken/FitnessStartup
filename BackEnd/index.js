const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const cors = require('cors');
app.use(cors());

const createAccount = require('./Auth/createAccount');
const signinEmail = require('./Auth/signinEmail');
const signinConfirm = require('./Auth/signinConfirm');
const confirmVerification = require('./Auth/confirmVerification');
const skipSetup = require('./Setup/skipSetup');
const finishSetup = require('./Setup/finishSetup');
const addChange = require('./Change/addChange');
const removeChange = require('./Change/removeChange');
const addPost = require('./Posts/addPost');
const finishChange = require('./Change/finishChange');
const getPosts = require('./Posts/getPosts');
const likePost = require('./Posts/likePost');
const getOnePost = require('./Posts/getOnePost');






app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.put('/createAccount', createAccount);
app.post('/signinEmail', signinEmail);
app.post('/signinConfirm', signinConfirm);
app.put('/confirmVerification', confirmVerification);
app.put('/skipSetup', skipSetup);
app.put('/finishSetup', finishSetup);
app.put('/addChange', addChange);
app.put('/removeChange', removeChange);
app.put('/addPost', addPost);
app.put('/finishChange', finishChange); 
app.post('/getPosts', getPosts);
app.put('/likePost', likePost);
app.post('/getOnePost', getOnePost);




app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });