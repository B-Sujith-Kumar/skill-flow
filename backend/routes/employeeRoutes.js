// routes/employeeRoutes.js

const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.post("/login", employeeController.login);

module.exports = router;
