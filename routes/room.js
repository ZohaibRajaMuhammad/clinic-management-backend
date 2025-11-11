const express = require('express')
const routes = express.Router();
const {
  createRoom,
  getRoomById,
  getAllRooms,
  updateRoom,
  deleteRoom,
} = require("../controller/room.controller");

// CRUD Routes
routes.post("/create", createRoom);      
routes.get("/all", getAllRooms);         
routes.get("/:id", getRoomById);         
routes.put("/update/:id", updateRoom);    
routes.delete("/delete/:id", deleteRoom); 


module.exports = routes