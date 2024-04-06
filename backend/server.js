
const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./database/db");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());


connectDB();

app.use("/api/employee", employeeRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
