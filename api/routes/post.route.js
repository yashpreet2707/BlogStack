import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  getposts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userID", verifyToken, deletePost);
router.put("/updatepost/:postId/:userID", verifyToken, updatePost);

export default router;
