import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostById } from "../controllers/postController";

const router = Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

export default router;