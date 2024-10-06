require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const usersModel = require("../models/usermodel");
const router = express.Router();

const crypto = require("crypto");
const bcrypt = require("bcryptjs"); // Updated to bcryptjs
const jwt = require("jsonwebtoken");

const jwtTocken = require("../Handler/token");
const joi = require("joi");
const cloudinary = require("../Handler/cloud");
const islogging = require("../middlewere/user_isloggin");
const upload = require("../middlewere/fileupload");
const client_islogging = require("../middlewere/.dist/client_isloggin");
const cron = require("node-cron");
const clientModel = require("../models/clientModel");
const { error } = require("console");

cron.schedule("*/25 * * * *", async () => {
  try {
    console.log("Cron job running...");
    const clients = await clientModel.find({
      otpexpire: { $lt: Date.now() },
      otpVerifiy: false,
    });
    console.log("Users found to be deleted:", clients);
    const result = await clientModel.deleteMany({
      otpexpire: { $lt: Date.now() },
      otpVerifiy: false,
    });
    console.log(`${result.deletedCount} unverified users deleted.`);
  } catch (error) {
    console.error("Error deleting users:", error);
  }
});

// Routes...
//registration route
router.post("/Registor", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        error: true,
        message: "File not found",
        status: 500,
      });
    }

    const schema = joi.object({
      username: joi.string().required().min(4),
      email: joi.string().email().required(),
      password: joi.string().required().min(4).max(7),
      // .pattern(new RegExp('[A-Z]'))
      // .pattern(new RegExp('[a-z]'))
      // .pattern(new RegExp('[0-9]'))
      // .pattern(new RegExp('[!@#$%^&*(),.?":{}|<>]')),
      image: joi.string(),
    });

    const picon = req.file.path;
    cloudinary.uploader.upload(picon, async (err, result) => {
      if (err) {
        return res.json({
          error: true,
          message: err.message,
          status: 500,
        });
      } else {
        let value = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          image: result.secure_url,
        };

        const trans = nodemailer.createTransport({
          host: "smtp.gmail.com",
          service: "gmail",
          auth: {
            type: "login", // default
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        const results = schema.validate(value);
        let otp = crypto.randomInt(1000, 10000);
        const otpexpire = new Date(Date.now() + process.env.EXPIRE * 60000);

        if (results.error) {
          res.status(505).send(results.error.details[0].message);
        } else {
          const client = await clientModel.findOne({
            email: results.value.email,
          });

          const user = await usersModel.findOneAndUpdate(
            { email: results.value.email }, // Query to find the client
            { $set: { isfreelencer: true } }, // Update operation
            { new: true } // Options: return the updated document
          );

          if (user) {
            res.status(500).json({
              warning: "this is registored for the for the user account ",
            });
          }
          if (client) {
            res.status(500).json({ warning: "this user is already exist" });
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(results.value.password, salt, async (err, hash) => {
                try {
                  const createdClient = await clientModel.create({
                    username: results.value.username,
                    email: results.value.email,
                    password: hash,
                    image: results.value.image,
                    otp: otp,
                    otpexpire: otpexpire,
                  });

                  const mailOptions = {
                    from: process.env.EMAIL,
                    to: createdClient.email,
                    subject: "Email Verification OTP",
                    html: `<p>Your OTP for verification is <strong>${otp}</strong>. It expires in 30 minutes.</p>`,
                  };

                  await trans.sendMail(mailOptions);
                  res.status(200).json({
                    success: true,
                    data: createdClient,
                    msg: "client is created successfully",
                  });
                } catch (err) {
                  res.status(500).json({ success: false, error: err.message });
                }
              });
            });
          }
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/freelence", async (req, res) => {
  const users = await usersModel.find();
  res.json({ success: true, data: users });
});
//otp verification route

router.post("/verifyotp", async (req, res) => {
  try {
    const otp = req.body.otp;
    console.log(otp);
    const client = await clientModel.findOne({ otp });

    if (client) {
      if (client.otpexpire < Date.now()) {
        await client.deleteOne({ _id: client._id });
        return res
          .status(400)
          .json({ message: "OTP has expired. User account deleted." });
      } else {
        client.otpVerifiy = true;
        client.otpexpire = null;
        client.otp = null;
        await client.save();
        return res
          .status(200)
          .json({ success: true, msg: "your account verification is done " });
      }
    } else {
      return res.json("invalid otp");
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//setting profile route
router.post("/setProfile/:email", async (req, res) => {
  try {
    console.log(req.params.email);
    const schema = joi.object({
      companyName: joi.string().min(3),
      skills: joi.string().required(),

      // .pattern(new RegExp('[A-Z]'))
      // .pattern(new RegExp('[a-z]'))
      // .pattern(new RegExp('[0-9]'))
      // .pattern(new RegExp('[!@#$%^&*(),.?":{}|<>]')),
      location: joi.string().required().min(10),
    });

    const value = {
      companyName: req.body.companyName,
      skills: req.body.skill,
      location: req.body.location,
    };

    const result = schema.validate(value);
    client = await clientModel.findOne({
      email: req.params.email,
      otpVerifiy: true,
      isfreelencer: false,
    });
    console.log(client);
    if (result.error) {
      return res.status(505).json(result.error.details[0].message);
    }
    // const client= await clientModel.findOneAndUpdate({email:{ $lt: req.params.email },
    //     companyName:result.value.companyName,
    //   skills:result.value.skills,

    //   location:result.value.location,

    // })
    if (client) {
      client.companyName = result.value.companyName;
      client.skills.push(result.value.skills);
      client.location = result.value.location;
      await client.save();
      return res
        .status(200)
        .json({ success: true, msg: "your profile is set successfulll" });
    } else {
      return res.status(400).json({ success: true, msg: "something wrong" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//login route
router.get("/deleteAccount/:email", async (req, res) => {
  try {
    const client = await clientModel.findOneAndDelete({
      email: req.params.email,
    });
    res.clearCookie();
    res
      .status(200)
      .json({ success: true, msg: "account deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    const client = await clientModel.findOne({ email: email });
    const user = await usersModel.findOne({
      email: email,
      isclient: { $lt: true },
    });
    console.log(client);
    if (user) {
      return res.status(500).json({ warning: "user" });
    }
    if (!client) {
      return res.status(500).json({ warning: "Something is wrong" });
    }
    if (client.otpVerifiy) {
      bcrypt.compare(password, client.password, (err, result) => {
        if (result) {
          let tokenClient = jwtTocken(client);
          res.cookie("tokenClient", tokenClient);
          res.status(200).json({ success: true, msg: "loging success" });
        } else {
          res.json("Wrong password");
        }
      });
    } else {
      res.json("Email is not verified");
    }
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
