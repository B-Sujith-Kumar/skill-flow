
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./database/db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/employees", employeeRoutes);
app.use("/api/admins", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
