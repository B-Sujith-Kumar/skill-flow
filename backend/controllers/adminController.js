// controllers/adminController.js

const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

const adminController = {
  login: async (req, res) => {
    const { adminId, password } = req.body;

    try {
      const admin = await Admin.findOne({ admin_id: adminId });

      if (!admin || !bcrypt.compareSync(password, admin.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // You might want to generate a token here and send it back to the client
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = adminController;
