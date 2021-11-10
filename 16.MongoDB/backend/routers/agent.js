const express = require('express');
const router = express.Router();

const { showAllCities } = require('../controller/agent');

router.get('/cities', showAllCities);

module.exports = router;
