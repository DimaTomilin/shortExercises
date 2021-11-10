const express = require('express');
const server = express();

const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const apiRouter = require('./backend/routers/agent');

server.use(cors());
server.use(express.json());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected'));

server.use(morgan('tiny'));

// server.use('/', express.static(path.resolve('./frontend'))); // serve main path as static dir
// server.get('/', function (req, res) {
//   // serve main path as static file
//   res.sendFile(path.resolve('./frontend/index.html'));
// });

server.use('/api', apiRouter);

// server.get('/info', async (request, response) => {
//   const date = Date();
//   const personList = await Person.find({});
//   response.send({ date: date, numberOfPeople: personList.length });
// });

const port = process.env.PORT || 3030;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
