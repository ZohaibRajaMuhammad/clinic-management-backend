const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const Patient = require("../models/pateint");
const sendMail = require("../utils/mailer");
const appointmentTemplate = require("../utils/appointmentTemplate");
const User = require("../models/user");

// const createAppointment = async (req, res) => {
//   try {
//     const {
//       patientId,
//       doctorId,
//       roomId,
//       appointmentDate,
//       startAt,
//       endAt,
//       reason,
//       createdBy,
//     } = req.body;

//     // Step 1: Required fields check
//     if (!patientId || !doctorId || !appointmentDate || !startAt || !endAt) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Step 2: Fetch doctor details
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     const appointmentDay = new Date(appointmentDate)
//     .toLocaleDateString("en-US", { weekday: "long" })
//     .trim()
//     .toLowerCase();

//     const availableDays = doctor.availableDays.map((d) =>
//         d.trim().toLowerCase()
// );

//     if (!availableDays.includes(appointmentDay)) {
//       return res.status(400).json({
//         message: `Doctor is not available on ${appointmentDay}. Available days are: ${doctor.availableDays.join(
//           ", "
//         )}`,
//       });
//     }

//     // Step 4: Check doctor available time window
//     const selectedStart = new Date(startAt);
//     const selectedEnd = new Date(endAt);

//     // Convert doctor times ("09:00", "17:00") into Date objects for comparison
//     const [startHour, startMin] = doctor.availableTime.start
//       .split(":")
//       .map(Number);
//     const [endHour, endMin] = doctor.availableTime.end.split(":").map(Number);

//     const doctorStart = new Date(appointmentDate);
//     doctorStart.setHours(startHour, startMin, 0);

//     const doctorEnd = new Date(appointmentDate);
//     doctorEnd.setHours(endHour, endMin, 0);

//     if (selectedStart < doctorStart || selectedEnd > doctorEnd) {
//       return res.status(400).json({
//         message: `Doctor is available only between ${doctor.availableTime.start} - ${doctor.availableTime.end}`,
//       });
//     }

//     // Step 5: Check for time conflict (overlapping appointments)
//     const conflict = await Appointment.findOne({
//       doctorId,
//       appointmentDate: new Date(appointmentDate),
//       status: { $in: ["booked", "checked-in"] },
//       $or: [
//         { startAt: { $lt: selectedEnd }, endAt: { $gt: selectedStart } }, // overlapping condition
//       ],
//     });

//     if (conflict) {
//       return res.status(400).json({
//         message: "This time slot is already booked by another patient.",
//       });
//     }

//     // Step 6: Create Appointment
//     const newAppointment = await Appointment.create({
//       patientId,
//       doctorId,
//       roomId: doctor.roomId || roomId, // optional override
//       appointmentDate,
//       startAt,
//       endAt,
//       reason,
//       createdBy,
//       status: "booked",
//     });

//     const doctorUser = await User.findById(doctor.userId);
//     const patientUser = await User.findById(patientId);

//     const { subject, html } = appointmentTemplate("booked", {
//       doctorName: doctorUser.name,
//       patientName: patientUser.name,
//       appointmentDate,
//       startAt,
//       endAt,
//       day: new Date(appointmentDate).toLocaleDateString("en-US", {
//         weekday: "long",
//       }),
//     });

//     await sendMail({
//       to: doctorUser.email,
//       subject,
//       html,
//     });

//     return res.status(201).json({
//       message: "Appointment booked successfully!",
//       appointment: newAppointment,
//     });
//   } catch (error) {
//     console.error("Create Appointment Error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server Error", error: error.message });
//   }
// };


// const createAppointment = async (req, res) => {
//   try {
//     const {
//       patientId,
//       doctorId,
//       roomId,
//       appointmentDate,
//       startAt,
//       endAt,
//       reason,
//       createdBy,
//     } = req.body;

//     // Step 1: Required fields check
//     if (!patientId || !doctorId || !appointmentDate || !startAt || !endAt) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Step 2: Fetch doctor details
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

    
//     let parsedDate = new Date(appointmentDate);

  
//     if (isNaN(parsedDate.getTime())) {
//       const [month, day, year] = appointmentDate.split(/[/-]/).map(Number);
//       parsedDate = new Date(year, month - 1, day);
//     }

//     if (isNaN(parsedDate.getTime())) {
//       return res
//         .status(400)
//         .json({ message: "Invalid appointmentDate format" });
//     }

    
//     const dateString = parsedDate.toISOString().split("T")[0]; 

//     function normalizeTimeString(timeStr) {
//       // Trim spaces and ensure AM/PM is uppercase with space
//       if (!timeStr) return null;
//       let t = timeStr.trim().toUpperCase();

//       // Add minutes if missing, e.g. "11AM" → "11:00 AM"
//       if (!t.includes(":")) {
//         t = t.replace(/(AM|PM)/, ":00 $1");
//       } else {
//         t = t.replace(/(AM|PM)/, " $1");
//       }

//       return t;
//     }

//     const startNorm = normalizeTimeString(startAt);
//     const endNorm = normalizeTimeString(endAt);

//     const parsedStart = new Date(`${dateString} ${startNorm}`);
//     const parsedEnd = new Date(`${dateString} ${endNorm}`);

//     if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
//       return res
//         .status(400)
//         .json({ message: "Invalid startAt or endAt format" });
//     }

//     // Step 4: Determine appointment day (for availability check)
//     const appointmentDay = parsedDate
//       .toLocaleDateString("en-US", { weekday: "long" })
//       .trim()
//       .toLowerCase();

//     const availableDays = doctor.availableDays.map((d) =>
//       d.trim().toLowerCase()
//     );

//     if (!availableDays.includes(appointmentDay)) {
//       return res.status(400).json({
//         message: `Doctor is not available on ${appointmentDay}. Available days are: ${doctor.availableDays.join(
//           ", "
//         )}`,
//       });
//     }

//     // Step 5: Check doctor available time window
//     const [startHour, startMin] = doctor.availableTime.start
//       .split(":")
//       .map(Number);
//     const [endHour, endMin] = doctor.availableTime.end.split(":").map(Number);

//     const doctorStart = new Date(parsedDate);
//     doctorStart.setHours(startHour, startMin, 0, 0);

//     const doctorEnd = new Date(parsedDate);
//     doctorEnd.setHours(endHour, endMin, 0, 0);

//     if (parsedStart < doctorStart || parsedEnd > doctorEnd) {
//       return res.status(400).json({
//         message: `Doctor is available only between ${doctor.availableTime.start} - ${doctor.availableTime.end}`,
//       });
//     }

//     // Step 6: Check for overlapping appointments
//     const conflict = await Appointment.findOne({
//       doctorId,
//       appointmentDate: parsedDate,
//       status: { $in: ["booked", "checked-in"] },
//       $or: [{ startAt: { $lt: parsedEnd }, endAt: { $gt: parsedStart } }],
//     });

//     if (conflict) {
//       return res.status(400).json({
//         message: "This time slot is already booked by another patient.",
//       });
//     }

//     // Step 7: Create Appointment
//     const newAppointment = await Appointment.create({
//       patientId,
//       doctorId,
//       roomId: doctor.roomId || roomId,
//       appointmentDate: parsedDate,
//       startAt: parsedStart,
//       endAt: parsedEnd,
//       reason,
//       createdBy,
//       status: "booked",
//     });

//     // Step 8: Send Email
//     const doctorUser = await User.findById(doctor.userId);
//     const patientUser = await User.findById(createdBy);

//     const { subject, html } = appointmentTemplate("booked", {
//       doctorName: doctorUser.name,
//       patientName: patientUser.name,
//       appointmentDate: parsedDate.toDateString(),
//       startAt: parsedStart.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       endAt: parsedEnd.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       day: appointmentDay,
//     });

//     await sendMail({
//         // to: doctorUser.email, // Pro Mode
//       to: "ahmedmoizawan007@gmail.com", // Dev Mode
//       subject,
//       html,
//     });

//     return res.status(201).json({
//       message: "Appointment booked successfully!",
//       appointment: newAppointment,
//     });
//   } catch (error) {
//     console.error("Create Appointment Error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server Error", error: error.message });
//   }
// };

const createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      roomId,
      appointmentDate,
      startAt,
      endAt,
      reason,
      createdBy,
    } = req.body;

    if (!patientId || !doctorId || !appointmentDate || !startAt || !endAt) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Parse appointment date properly
    let parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate)) {
      const [month, day, year] = appointmentDate.split(/[/-]/).map(Number);
      parsedDate = new Date(year, month - 1, day);
    }
    if (isNaN(parsedDate))
      return res.status(400).json({ message: "Invalid appointmentDate format" });

    const dateString = parsedDate.toISOString().split("T")[0];

    function normalizeTimeString(timeStr) {
      if (!timeStr) return null;
      let t = timeStr.trim().toUpperCase();
      if (!t.includes(":")) t = t.replace(/(AM|PM)/, ":00 $1");
      else t = t.replace(/(AM|PM)/, " $1");
      return t;
    }

    const startNorm = normalizeTimeString(startAt);
    const endNorm = normalizeTimeString(endAt);
    const parsedStart = new Date(`${dateString} ${startNorm}`);
    const parsedEnd = new Date(`${dateString} ${endNorm}`);

    if (isNaN(parsedStart) || isNaN(parsedEnd))
      return res.status(400).json({ message: "Invalid startAt or endAt format" });

    // Clinic time boundaries
    const clinicStart = new Date(parsedDate);
    clinicStart.setHours(10, 0, 0, 0); // 10:00 AM

    const clinicEnd = new Date(parsedDate);
    clinicEnd.setHours(20, 0, 0, 0); // 8:00 PM

    if (parsedStart < clinicStart || parsedEnd > clinicEnd) {
      return res.status(400).json({
        message: "Clinic operates between 10:00 AM - 8:00 PM only.",
      });
    }

    // Step: check existing appointments for that doctor/day
    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: parsedDate,
      status: { $in: ["booked", "checked-in"] },
    }).sort({ startAt: 1 });

    // Check if there's an overlap
    const conflict = appointments.find(
      (a) => parsedStart < a.endAt && parsedEnd > a.startAt
    );

    if (conflict) {
      // Generate available slots (30 min intervals)
      const availableSlots = [];
      let current = new Date(clinicStart);

      while (current < clinicEnd) {
        const slotStart = new Date(current);
        const slotEnd = new Date(current.getTime() + 30 * 60000); // +30 min

        // check if slot overlaps with any booked appointment
        const overlap = appointments.some(
          (a) => slotStart < a.endAt && slotEnd > a.startAt
        );

        if (!overlap && slotEnd <= clinicEnd) {
          availableSlots.push({
            startAt: slotStart.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            endAt: slotEnd.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        }

        current = slotEnd;
      }

      return res.status(400).json({
        message: "This time slot is already booked. Please select another time.",
        availableSlots,
      });
    }

    // No conflict → Create appointment
    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      roomId: doctor.roomId || roomId,
      appointmentDate: parsedDate,
      startAt: parsedStart,
      endAt: parsedEnd,
      reason,
      createdBy,
      status: "booked",
    });

    return res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Create Appointment Error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    const doctor = await Doctor.findById(appointment.doctorId).populate(
      "userId"
    );
    const patient = await User.findById(req.user.userId);

    const { subject, html } = appointmentTemplate("cancelled", {
      doctorName: doctor.userId.name,
      patientName: patient.name,
      appointmentDate: appointment.appointmentDate,
      startAt: appointment.startAt,
      endAt: appointment.endAt,
      day: new Date(appointment.appointmentDate).toLocaleDateString("en-US", {
        weekday: "long",
      }),
    });

    await sendMail({
      to: doctor.userId.email,
      subject,
      html,
    });

    return res
      .status(200)
      .json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Cancel Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const confirmAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "checked-in"; // or "confirmed" if you want
    await appointment.save();

    return res
      .status(200)
      .json({ message: "Appointment confirmed successfully" });
  } catch (error) {
    console.error("Confirm Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "completed";
    await appointment.save();

    return res
      .status(200)
      .json({ message: "Appointment confirmed successfully" });
  } catch (error) {
    console.error("Confirm Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getAllAppointement = async (req, res) => {
  try {
    const allAppointmnet = await Appointment.find()
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          model: "User",
          select: "name email phone gender profileImage",
        },
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          model: "User",
          select: "name email phone gender profileImage",
        },
      })
      .populate("roomId");

    res.status(200).json({ data: allAppointmnet });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const doctorAppointment = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!doctorId) {
      return res.status(400).json({ message: "doctor id not found" });
    }

    const appointment = await Appointment.find({ doctorId })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          model: "User",
          select: "name email phone gender profileImage",
        },
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          model: "User",
          select: "name email phone gender profileImage",
        },
      })
      .populate("roomId");

    if (appointment.length < 1) {
      return res.status(404).json({ message: "Doctor appointments not found" });
    }

    res.status(200).json({ data: appointment });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const pateintAppointment = async (req, res) => {
  try {
    const { pateintId } = req.params;

    if (!pateintId) {
      return res.status(400).json({ message: "patient id not found" });
    }

    const appointment = await Appointment.find({ patientId: pateintId })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          model: "User",
          select: "name email phone gender profileImage",
        },
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          model: "User",
          select: "name email phone gender profileImage",
        },
      })
      .populate("roomId");

    if (appointment.length < 1) {
      return res
        .status(404)
        .json({ message: "Patient appointments not found" });
    }

    res.status(200).json({ data: appointment });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


module.exports = {
  createAppointment,
  cancelAppointment,
  confirmAppointment,
  completeAppointment,
  getAllAppointement,
  doctorAppointment,
  pateintAppointment,
};
