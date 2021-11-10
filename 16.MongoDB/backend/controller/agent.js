const Agent = require('../models/agent');

exports.showAllCities = async (req, res) => {
  try {
    Agent.find({})
      .distinct('city')
      .then((cities) => {
        res.json(cities);
      });
  } catch (error) {
    res.send(error);
    return;
  }
};

exports.agentsFromCity = async (req, res) => {
  const city = req.query.city;
  try {
    Agent.find({ city }).then((agents) => {
      res.json(agents);
    });
  } catch (error) {
    res.send(error);
    return;
  }
};

exports.updateAgentCity = async (req, res) => {
  const _id = req.params.id;
  const city = req.body.city;
  try {
    Agent.findByIdAndUpdate(_id, { city }, function (err, docs) {
      if (err) {
        throw err;
      } else {
        res.send(docs);
      }
    });
  } catch (error) {
    res.send(error);
    return;
  }
};
