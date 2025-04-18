import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  getposts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userID", verifyToken, deletePost);

export default router;
