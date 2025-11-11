const Room = require("../models/room");


const createRoom = async (req, res) => {
  try {
    const { roomNumber, RoomName, status } = req.body;

   
    const existing = await Room.findOne({ roomNumber });
    if (existing) {
      return res.status(400).json({ message: "Room already exists!" });
    }

    const room = await Room.create({ roomNumber, RoomName, status });
    res.status(201).json({ message: "Room created successfully!", room });
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error: error.message });
  }
};


const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room", error: error.message });
  }
};


const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 }); // sort by roomNumber
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error: error.message });
  }
};


const updateRoom = async (req, res) => {
  try {
    const { roomNumber, RoomName, status } = req.body;
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { roomNumber, RoomName, status },
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error: error.message });
  }
};


const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error: error.message });
  }
};

module.exports = {
  createRoom,
  getRoomById,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
