const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const cors = require('cors');
app.use(cors());

const createAccount = require('./Auth/createAccount');


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.put('/createAccount', createAccount);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });