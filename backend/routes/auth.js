const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "myJwtSecret";

// registering new user with post method
router.post(
  "/create-user",
  [
    check("name").isLength({ min: 3 }),
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    let sucess = false;

    if (!result.isEmpty()) {
      res.json(result);
    } // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ sucess,error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: { id: user.id },
      };
      const token = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({ sucess,token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

//login endpoint

router.post(
  "/login",
  [check("email").isEmail(), check("password").notEmpty()],
  async (req, res) => {
    let sucess = false;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.json(result);
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({
          sucess: false,
          message: "please login with correct Credentials",
        });
      }

      const comparePass = await bcrypt.compare(password, user.password);

      if (!comparePass) {
        return res.status(400).send({
          sucess: false,
          message: "please login with correct Credentials",
        });
      }

      const data = {
        user: { id: user.id },
      };
      const token = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({ sucess, token });
    } catch (error) {
      res.status(500).send({
        sucess: false,
        message: "error in logging in",
        error,
      });
    }
  }
);

//getting data of user

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    res.send(user);
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "error in getting data",
      error,
    });
  }
});
module.exports = router;
