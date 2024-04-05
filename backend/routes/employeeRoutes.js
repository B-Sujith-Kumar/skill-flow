// routes/employeeRoutes.js

const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const empModel = require('../models/employeeModel');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    try {
        const user = await empModel.create({
            employeeId: req.body.employeeId,
            password: secPass,
            email: req.body.email,
        });
        res.send(user);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send('Duplicate employee ID or email.');
        } else {
            console.error('Error creating user:', error);
            res.status(500).send('Internal server error.');
        }
    }
});

router.post("/login", employeeController.empLogin);

router.post("/set-password", employeeController.empSetPassword);

module.exports = router;
