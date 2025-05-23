import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
const port = 3000;

dotenv.config();

app.use(cors({
  origin: ['https://blog-stack-zeta.vercel.app', 'http://localhost:5173'],
  credentials:true,   
}))

// connection to database
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB is connected."))
  .catch((err) => console.log(err));

// middlewares
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => console.log(`Server is running at localhost:${port}`));

// routes
app.get("/", (req, res) => res.send("Hello buddy!")); // testing
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// middlewares
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
