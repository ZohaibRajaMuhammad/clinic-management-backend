const  mongoose  = require("mongoose");
const Patient = require("../models/pateint");


const completeProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { age, bloodGroup, address } = req.body;


   // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    const patient = await Patient.findOne({ userId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    // Step 2: Update patient details
    patient.age = age || patient.age;
    patient.bloodGroup = bloodGroup || patient.bloodGroup;
    patient.address = address || patient.address;

    // Step 3: Save updated data
    await patient.save();

    res.status(200).json({
      message: "Profile completed successfully!",
      patient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error completing profile!",
      error: error.message,
    });
  }
};

module.exports = { completeProfile };
