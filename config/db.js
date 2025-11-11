const mongoose = require("mongoose");

const dbConnect = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("✔ Database connected");
  } catch (error) {
    console.log("❌ Database not Connected", error);
    //  process.exit(1)
  }
};

module.exports = dbConnect;
