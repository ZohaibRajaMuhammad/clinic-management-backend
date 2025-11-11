const express  = require("express")
const  tokenVerify  =  require("../middleware/tokenVerify.js")
const { getTopCards, getAllUsers, updateUser, deleteUser } =  require("../controller/dashboard.controller.js")
const routes = express.Router()


routes.get("/TopCards", tokenVerify, getTopCards)
routes.get("/users", getAllUsers); 
routes.put("/user/:id", updateUser); 
routes.delete("/user/:id", deleteUser); 

module.exports = routes
