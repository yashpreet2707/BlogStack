import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

const app = express();
const port = 3000;

dotenv.config();

// connection to database
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB is connected."))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server is running at localhost:${port}`));

// routes
app.use("/api/user", userRoutes);
