const Register = require("../model/register");
// const Otp = require("../model/otp");
const { google } = require("googleapis");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
const { session } = require("passport");

const createUser = asyncWrapper(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const uname = req.body.uname;

  const tasks = await Register.findOne({ email: email });

  if (!tasks) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const registerUser = await Register.create(req.body);

    req.session.userId = registerUser["_id"];
    req.session.email = req.body.email;
    req.session.uname = req.body.pname;

    res.render("users/template1", {
      uname: req.session.uname,
      email: req.session.email,
      uid: req.session.userId,
    });
  } else {
    req.flash("message", "This email address is already registered with us");
    res.redirect("/register");
  }
});

const getUser = asyncWrapper(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const uname = req.body.uname;

  const tasks = await Register.findOne({ email }).then((user) => {
    if (!user) {
      req.flash("message", "User not exist");
      res.redirect("/login");
    }
    bcrypt.compare(password, user.password, async (err, data) => {
      //if error than throw error
      if (err) {
        req.flash("message", "Password you entered is incorrect");
        res.redirect("/login");
      }

      //if both match than you can do anything
      if (data) {
        // console.log();

        req.session.userId = user._id;
        req.session.email = user.email;
        req.session.uname = user.uname;

        res.render("users/template1", {
          uname: req.session.uname,
          email: req.session.email,
          uid: req.session.userId,
        });
        // return res.status(200).json({ msg: "Login success" })
      } else {
        req.flash("message", "Incorrect Password");
        res.redirect("/login");
        // return res.status(401).json({ msg: "Invalid credencial" })
      }
    });
  });
});

module.exports = {
  createUser,
  getUser,
};
