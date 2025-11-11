const express = require('express');
const { createAppointment, cancelAppointment, completeAppointment, getAllAppointement, doctorAppointment, pateintAppointment } = require('../controller/appointment.controller');
const { fixAvailableDays } = require('../controller/doctor.controller');
const routes = express.Router();
const tokenVerify = require('../middleware/tokenVerify')



routes.post('/create', createAppointment)
routes.put('/cancel/:appointmentId', tokenVerify, cancelAppointment)
routes.put('/complete/:appointmentId', completeAppointment)

routes.get('/allAppointment', getAllAppointement)
routes.get('/doctorAppointment/:doctorId', doctorAppointment)
routes.get('/pateintAppointment/:pateintId', pateintAppointment)






module.exports = routes