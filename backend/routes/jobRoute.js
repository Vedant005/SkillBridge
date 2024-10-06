require("dotenv").config();
const jobmodel = require("../models/jobModel");
const express = require("express");
const usersModel = require("../models/usermodel");
const router = express.Router();
const joi = require("joi");
const cloudinary = require("../Handler/cloud");
const islogging = require("../middlewere/user_isloggin");
const client_islogging = require("../middlewere/.dist/client_isloggin");
const upload = require("../middlewere/fileupload");
const clientModel = require("../models/clientModel");
const { error, time } = require("console");
const { emitWarning } = require("process");
const jobModel = require("../models/jobModel");

router.post(
  "/Createjob",
  client_islogging,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.json({
          error: true,
          message: "File not found",
          status: 500,
        });
      }
      const schema = joi.object({
        title: joi.string().required().min(5),
        des: joi.string().required().min(10),
        cat: joi.string().required().min(3),
        level: joi.string().required(),
        timePriod: joi.string().required(),
        prize: joi.number().required(),
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
          const value = {
            title: req.body.title,
            des: req.body.des,
            cat: req.body.cat,
            level: req.body.level,
            timePriod: req.body.timePriod,
            prize: req.body.prize,
            image: result.secure_url,
          };
          const results = schema.validate(value);
          if (results.error) {
            res.status(505).jsom(results.error.details[0].message);
          } else {
            try {
              const jobs = await jobmodel.create({
                title: results.value.title,
                des: results.value.des,
                cat: results.value.cat,
                level: results.value.level,
                timePriod: results.value.timePriod,
                prize: results.value.prize,
                image: results.value.image,
              });
              const client = await clientModel
                .findOne({ email: req.client.email })
                .populate("job");
              // console.log(jobs)
              client.job.push(jobs._id);
              await client.save();
              res
                .status(200)
                .json({ success: true, msg: "job is created successfully" });
            } catch (err) {
              res
                .status(500)
                .json({ success: false, emitWarning: err.message });
            }
          }
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, emitWarning: err.message });
    }
  }
);

router.get("/clientjobs", client_islogging, async (req, res) => {
  const client = await clientModel
    .findOne({ email: req.client.email })
    .populate("job");
  res.json(client.job);
});
router.get("/alljobs", async (req, res) => {
  const jobs = await jobModel.find();

  res.json(jobs);
});

module.exports = router;
