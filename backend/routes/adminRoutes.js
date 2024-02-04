// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const employee_creation_controller = require("../controllers/employee_creation_controller");
const bcrypt = require("bcryptjs");
const adminModel = require("../models/adminModel");

router.post("/", async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await adminModel.create({
      adminId: req.body.adminId,
      password: secPass,
      email: req.body.email,
    });
    res.send(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("Duplicate admin ID or email.");
    } else {
      console.error("Error creating admin:", error);
      res.status(500).send("Internal server error.");
    }
  }
});

router.post("/login", adminController.adminLogin);

router.post("/create", employee_creation_controller.empCreate);

router.post("/update", employee_creation_controller.empUpdate);

router.post("/delete", employee_creation_controller.deleteEmployee);

module.exports = router;
