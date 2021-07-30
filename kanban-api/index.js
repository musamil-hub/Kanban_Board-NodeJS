require('./db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const postCardRoutes = require('./routes/card');
const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/postcards', postCardRoutes);

app.listen(4040, () => {
  console.log('Server Started');
});
