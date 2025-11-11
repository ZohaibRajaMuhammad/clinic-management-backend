const express = require('express');
const { completeProfile } = require('../controller/pateint.controller');
const routes = express.Router();


routes.put("/completeProfile/:userId", completeProfile);

module.exports = routes