const express = require("express");
const {
  register,
  login,
  forgetPassword,
  resetPassword,
  inviteUser,
  setPassword,
} = require("../controller/auth.controller");
const upload = require("../middleware/multer");
const routes = express.Router();

routes.post("/register", upload.single('profileImage'), register);
routes.post("/login", login);
routes.post("/invite", upload.single('profileImage'), inviteUser);
routes.post("/setpassword/:token", setPassword);
routes.post("/forgetpassword",  forgetPassword);
routes.post("/resetpassword/:token", resetPassword);

module.exports = routes;
