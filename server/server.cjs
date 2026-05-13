require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.cjs");
const userRoutes = require("./routes/users.cjs");
const pokerRoutes = require("./routes/poker.cjs");

const port = process.env.PORT || 5050;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/poker", pokerRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(port, () => {
        console.log(`Connected to MongoDB and listening on port ${port}`);
    });
})
.catch((error) => console.log(error));