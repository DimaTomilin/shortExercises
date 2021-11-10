const express = require('express');
const router = express.Router();

const {
  showAllCities,
  agentsFromCity,
  updateAgentCity,
} = require('../controller/agent');

router.get('/cities', showAllCities);
router.get('/agents', agentsFromCity);
router.put('/agent/:id/edit', updateAgentCity);

module.exports = router;
