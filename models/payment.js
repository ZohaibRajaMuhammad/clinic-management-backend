const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["cash", "card", "online"], required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    transactionId: { type: String }, 
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);