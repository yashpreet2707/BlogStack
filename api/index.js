import express from "express";
import mongoose from "mongoose";
// const mongoose = require("mongoose")
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const port = 3000;

dotenv.config();

// connection to database
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB is connected."))
  .catch((err) => console.log(err));

// middlewares
app.use(express.json());

app.listen(port, () => console.log(`Server is running at localhost:${port}`));

// routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


// middlewares
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal Server Error' ;
    res.status(statusCode).json({
        sucess: false ,
        statusCode,
        message
    })
}) ;