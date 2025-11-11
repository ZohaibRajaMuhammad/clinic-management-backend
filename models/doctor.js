const  mongoose  = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: { type: String, required: true },
    qualification: { type: String },
    experience: { type: String },
    availableDays: [{ type: String }],
    availableTime: {
      start: { type: String },
      end: { type: String },
    },
    fees: { type: Number },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  },
  { timestamps: true }
);

module.exports= mongoose.model("Doctor", doctorSchema);