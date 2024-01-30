// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// MongoDB connection (replace <your-mongo-uri> with your MongoDB URI)
mongoose.connect("<your-mongo-uri>", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/employees", employeeRoutes);
app.use("/api/admins", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
