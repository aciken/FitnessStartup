const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const cors = require('cors');
app.use(cors());

const createAccount = require('./Auth/createAccount');
const signinEmail = require('./Auth/signinEmail');
const signinConfirm = require('./Auth/signinConfirm');


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.put('/createAccount', createAccount);
app.post('/signinEmail', signinEmail);
app.post('/signinConfirm', signinConfirm);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });