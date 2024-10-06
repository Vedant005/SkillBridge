
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
const usermodel = require("../models/usermodel");
const cron = require('node-cron');
const  clientModel = require('../models/clientModel');
const { error } = require("console");

cron.schedule('*/25 * * * *', async () => {
  try {
    console.log("Cron job running...");
    const users = await usermodel.find({ otpexpire: { $lt: Date.now() }, otpVerifiy: false });
    console.log("Users found to be deleted:", users);
    const result = await usermodel.deleteMany({ otpexpire: { $lt: Date.now() }, otpVerifiy: false });
    console.log(`${result.deletedCount} unverified users deleted.`);
  } catch (error) {
    console.error('Error deleting users:', error);
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
        status: 500
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
          status: 500
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
            pass: process.env.PASSWORD
          }
        });

        const results = schema.validate(value);
        let otp = crypto.randomInt(1000, 10000);
        const otpexpire = new Date(Date.now() + process.env.EXPIRE * 60000);

        if (results.error) {
          res.status(505).jsom(results.error.details[0].message);
        } else {
          const user = await usersModel.findOne({ email: results.value.email });
   
      
               const client = await clientModel.findOneAndUpdate(
                { email: results.value.email }, // Query to find the client
                { $set: { isclient: true } },   // Update operation
                { new: true }                   // Options: return the updated document
              );
              
          if(client){

            res.status(500).json({warning:"this is registored for the for the client account "})
          }
          else{

         
          if (user) {
            res.status(500).json({warning:"this user is already exist"})
            
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(results.value.password, salt, async (err, hash) => {
                try {
                  const createdUser = await usersModel.create({
                    username: results.value.username,
                    email: results.value.email,
                    password: hash,
                    image: results.value.image,
                    otp: otp,
                    otpexpire: otpexpire

                  });

                  const mailOptions = {
                    from: process.env.EMAIL,
                    to: createdUser.email,
                    subject: 'Email Verification OTP',
                    html: `<p>Your OTP for verification is <strong>${otp}</strong>. It expires in 30 minutes.</p>`,
                  };

                  await trans.sendMail(mailOptions);
                  res.status(200).json({success:true,data:createdUser,msg:"user is created successfully"})
                } catch (err) {
                  res.status(500).json({success:false,error:err.message});
                }
              });
            });
          }}
        }
      }
    });
  } catch (err) {
    res.status(500).json({success:false,error:err.message});
  }
});

//otp verification route


router.post("/verifyotp", async(req,res)=>{
  try{
  const otp = req.body.otp;

  const user= await usersModel.findOne({otp})
  if(user){
      if(user.otpexpire<Date.now()){
          await user.deleteOne({ _id: user._id });
          return res.status(400).json({ message: 'OTP has expired. User account deleted.' });
      }
      else{
        user.otpVerifiy=true
        user.otpexpire=null
        user.otp=null
       await  user.save()
        return  res.status(200).json({success:true,msg:"your account verification is done "})
      }
     
  }
  else{
     return res.json("invalid otp")
  }
}
catch(err){
  res.status(500).json({success:false,error:err.message})
}
})



//setting profile route
router.post("/setProfile/:email", async (req, res) => {
  try{
    console.log(req.params.email)
  const schema = joi.object({
    domain: joi.string(),
    skills: joi.string().required(),
    education: joi.string().required().min(3),
      // .pattern(new RegExp('[A-Z]'))
      // .pattern(new RegExp('[a-z]'))
      // .pattern(new RegExp('[0-9]'))
      // .pattern(new RegExp('[!@#$%^&*(),.?":{}|<>]')),
    location:joi.string().required().min(10),
    description:joi.string().required().min(10),
    portfolio:joi.string()
    
  });

  const value=({
    domain:req.body.domain,
    skills:req.body.skill,
    education:req.body.education,
    location:req.body.location,
    description:req.body.description,
    portfolio:req.body.portfolio
  })
  
const result=schema.validate(value)

if (result.error) {
 return res.status(505).json(result.error.details[0].message);
}
const user= await usersModel.findOne({email:req.params.email,otpVerifiy:true, isclient:false  })
console.log(user)
if(user){
user.domain=result.value.domain,
user.skills.push(result.value.skills)
user.education=result.value.education
user.location=result.value.location
user.description=result.value.description
user.portfolio=result.value.portfolio
await user.save()
 return res.status(200).json({success:true,msg:"your profile is set successfulll"})
}
else{
  return res.status(400).json({success:true,msg:"something wrong"})
}
  }
catch(err){
  res.status(500).json({success:false,
    error:err.message})
}
})

//login route
router.get("/deleteAccount/:email", async (req,res)=>{
  try{
    const user= await usermodel.findOneAndDelete({
      email:req.params.email
    })
    res.clearCookie()
    res.status(200).json({success:true,msg:"account deleted successfully"})
   
  }
  catch(err){
    res.status(500).json({success:false,error:err.message})
  }

})

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
       
    const user = await usersModel.findOne({email: email });
    const client= await clientModel.findOne({email:email, isclient:{$lt:true}})
    console.log(user)
    if (client) { return res.status(500).json({warning:"client"}); }
    if (!user) { return res.status(500).json({warning:"Something is wrong"}); }
    if (user.otpVerifiy) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwtTocken(user);
          res.cookie("token", token);
          res.status(200).json({success:true,msg:"loging success"});
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
