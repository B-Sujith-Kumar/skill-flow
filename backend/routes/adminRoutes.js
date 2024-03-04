// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const employeeController = require("../controllers/employeeController");
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

router.post("/create", employeeController.empCreate);

router.post("/update", employeeController.empUpdate);

router.post("/delete", employeeController.deleteEmployee);

router.get('/search/:employeeId', employeeController.searchEmployee);

router.post("/addJob", adminController.jobCreate);

router.get("/searchJob/:jobid", adminController.searchJob);

router.post("/deleteJob", adminController.deleteJob);

router.get("/displayJobs", adminController.displayjob);

router.get("/allJobs", adminController.displayAllJobs);

router.get("/departments", adminController.getDepartments);



module.exports = router;
