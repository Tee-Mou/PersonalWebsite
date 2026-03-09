require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/users.cjs");
const port = process.env.PORT || 5050

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(port, () => {
        console.log(`Connected to MongoDB and listening on port ${port}`);
    });
})
.catch((error) => console.log(error));