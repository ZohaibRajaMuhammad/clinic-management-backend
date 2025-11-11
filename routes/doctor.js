const express = require('express');
const { createCaseHistory, getCaseHistory, getallDoctors, getCaseHistories, updateCaseHistory, deleteCaseHistory } = require('../controller/doctor.controller');
const routes = express.Router()


routes.get('/getall', getallDoctors)

routes.post("/createCaseHistory", createCaseHistory); // Doctor only
routes.get("/getCaseHistory", getCaseHistories); 
routes.put("/updateCaseHistory/:id", updateCaseHistory);
routes.delete("/deleteCaseHistory/:id", deleteCaseHistory);

module.exports = routes