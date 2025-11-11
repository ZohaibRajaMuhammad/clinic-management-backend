let userModel = require("../models/user");
const doctorModel = require("../models/doctor");
const staffModel = require("../models/staff");
const roomModel = require("../models/room");
let jwt = require("jsonwebtoken");
let bcryptJs = require("bcryptjs");
let crypto = require("crypto");
const { uploadToCloudinary } = require("../config/cloudinary");
const resetPasswordTempl = require("../utils/reset-passwordTempl");
const sendMail = require("../utils/mailer");
const Patient = require("../models/pateint");
const inviteTemplate = require("../utils/inviteTemplate");

const register = async (req, res) => {
  const { name, email, password, role, phone, gender } = req.body;
  const profileImage = req.file;

  if (
    !name ||
    !email ||
    !password ||
    !role ||
    !phone ||
    !gender ||
    !profileImage
  ) {
    return res.status(401).json({ message: "All fields are required" });
  }

  try {
    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(profileImage.buffer);

    // hash password
    const hashedPassword = await bcryptJs.hash(password, 10);

    // create user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      gender,
      status: "active",
      profileImage: uploadResult.secure_url, // image URL from Cloudinary
    });

    await newUser.save();

    // patient document create
    Patient.create({
      userId: newUser._id,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        gender: newUser.gender,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔹 1. Find user by email
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // 🔹 2. Check if active
    if (user.status !== "active")
      return res.status(400).json({ message: "User is inactive" });

    // 🔹 3. Check password
    const passMatch = await bcryptJs.compare(password, user.password);
    if (!passMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    // 🔹 4. Prepare payload
    let payload = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // 🔹 5. Add role-based ID
    if (user.role === "patient") {
      const patient = await Patient.findOne({ userId: user._id }, "_id");
      if (patient) payload.patientId = patient._id;
    } 
    else if (user.role === "doctor") {
      const doctor = await doctorModel.findOne({ userId: user._id }, "_id");
      if (doctor) payload.doctorId = doctor._id;
    }

    // 🔹 6. Generate token
    const token = jwt.sign(payload, process.env.JWT_AUTH_SCRET);

    // 🔹 7. Send response (you can send just user if you want)
    res.status(200).json({
      message: "Successfully Logged In",
      data: user, // ya chaho to sirf payload bhi bhej sakte ho
      token,
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


const inviteUser = async (req, res) => {
  try {
    const { name, email, role, phone, gender } = req.body;
    const profileImage = req.file;

    if (!name || !email || !role || !phone || !gender) {
      return res.status(400).json({ message: "Missing required user fields" });
    }

    // Role-based field destructuring
    let doctorFields = {};
    let staffFields = {};

    if (role === "doctor") {
      let {
        specialization,
        qualification,
        experience,
        availableDays, // array ['Mon','Tue']
        availableTime, // object { start, end }
        fees,
        roomId,
      } = req.body;

     

      if (typeof availableTime === 'string') {
       availableTime = JSON.parse(availableTime);
}
      

      doctorFields = {
        specialization,
        qualification,
        experience,
        availableDays,
        availableTime,
        fees,
        roomId,
      };

      if (!specialization || !availableDays || !availableTime || !roomId) {
        return res.status(400).json({
          message:
            "Missing required doctor fields (specialization, availableDays, availableTime, roomId)",
        });
      }

      const room = await roomModel.findById(roomId);
      if (!room) {
        return res.status(400).json({ message: "Invalid room ID" });
      }

      // Check room availability
      if (room.status !== "available") {
        return res
          .status(400)
          .json({ message: `Room ${room.roomNumber} is currently occupied` });
      }

      // Check time conflict with another doctor
      const existingDoctor = await doctorModel.findOne({
        roomId,
        availableDays: { $in: availableDays },
      });

      if (existingDoctor) {
        const otherTime = existingDoctor.availableTime;
        const newStart = availableTime.start;
        const newEnd = availableTime.end;

        // overlap condition: newStart < otherEnd && newEnd > otherStart
        if (newStart < otherTime.end && newEnd > otherTime.start) {
          return res.status(400).json({
            message: `Room ${room.roomNumber} already booked by another doctor during this time slot.`,
          });
        }
      }
    }

    if (role === "staff") {
      const { designation, shiftTiming } = req.body;
      staffFields = { designation, shiftTiming };

      if (!designation || !shiftTiming) {
        return res.status(400).json({
          message: "Missing required staff fields (designation, shiftTiming)",
        });
      }
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let uploadedImage = null;
    if (profileImage) {
      const uploadResult = await uploadToCloudinary(profileImage.buffer);
      uploadedImage = uploadResult.secure_url;
    }

    const token = crypto.randomBytes(20).toString("hex");

    const newUser = new userModel({
      name,
      email,
      role,
      phone,
      gender,
      profileImage: uploadedImage,
      status: "inactive",
      inviteToken: token,
    });

    await newUser.save();

    if (role === "doctor") {
      await doctorModel.create({
        userId: newUser._id,
        ...doctorFields,
      });

      // Optional: mark room as occupied
      // await roomModel.findByIdAndUpdate(doctorFields.roomId, {
      //   status: "occupied",
      // });
    }

    if (role === "staff") {
      await staffModel.create({
        userId: newUser._id,
        ...staffFields,
      });
    }

    const inviteLink = `${process.env.BASE_URL}/setpassword/${token}`;
    const html = inviteTemplate(name, role, inviteLink);

    await sendMail({
      // to: email, promode 
      to: "ahmedmoizawan007@gmail.com", // dev mode
      subject: `You are invited to join as ${role}`,
      html,
    });

    return res.status(201).json({
      message: "Invitation sent successfully!",
      userId: newUser._id,
      role: newUser.role,
      inviteLink,
    });
  } catch (error) {
    console.error("Invite Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const setPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  
  
  try {
    // find invited user
    const user = await userModel.findOne({ inviteToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired invitation link" });
    }

    // hash new password
    const hashedPassword = await bcryptJs.hash(password, 10);
    user.password = hashedPassword;
    user.status = "active";
    user.inviteToken = null;

    await user.save();

    return res.status(200).json({ message: "Password set successfully, account activated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// ForgetPasword
const forgetPassword = async (req, res) => {
  let { email } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentails" });
    const token = crypto.randomBytes(20).toString("hex");

    // Expiry time set
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 120000; // 2 mnt
    await user.save();

    const resetLink = `${process.env.BASE_URL}/resetpassword/${token}`;

    let emailTemplate = resetPasswordTempl(user.name, resetLink);

    sendMail({
      // to: user.email, //Pro Mode
      to: "ahmedmoizawan007@gmail.com", // Dev Mode
      subject: "Reset Password",
      html: emailTemplate,
    });

    res.status(200).json({ message: "Sucess" });
  } catch (error) {
    console.log("failed why", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcryptJs.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password successfully reset!" });
  } catch (error) {
    res.status(500).json({ message: "server errrr!" });
  }
};

module.exports = {
  register,
  login,
  inviteUser,
  setPassword,
  forgetPassword,
  resetPassword,
};
