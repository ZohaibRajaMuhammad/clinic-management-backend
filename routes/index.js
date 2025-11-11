const express = require('express')
const routes = express.Router();
const authRoutes = require('./auth')
const roomRoutes = require('./room')
const patientRoutes = require('./patient')
const appointmentRoutes = require('./appointment')
const doctorRoutes = require('./doctor')
const dashboardRoutes = require('./dashboard')

routes.use('/auth', authRoutes)
routes.use('/room', roomRoutes)
routes.use('/patient', patientRoutes)
routes.use('/appointment', appointmentRoutes)
routes.use('/doctor', doctorRoutes)
routes.use('/dashboard', dashboardRoutes)

module.exports = routes