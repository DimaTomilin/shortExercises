const csv = require('csvtojson');
const path = require('path');
const mongoose = require('mongoose');
const Agent = require('./models/agent');
const dotenv = require('dotenv');
dotenv.config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected'));

const csvFilePath = path.resolve('./backend/assets/agents.csv');

csv()
  .fromFile(csvFilePath)
  .then((agents) => {
    const agentCollection = agents.map((agent) => {
      return {
        license_id: Object.values(agent)[0],
        name: Object.values(agent)[1],
        city: Object.values(agent)[2],
      };
    });
    Agent.insertMany(agentCollection)
      .then(function () {
        console.log('Data inserted'); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  });
