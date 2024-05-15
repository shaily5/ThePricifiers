const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

const passport = require("passport");
const { createUser, getUser } = require("../controllers/register");

router.route("/register").post(createUser);

router.route("/login").post(getUser);

module.exports = router;
