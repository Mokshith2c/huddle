import express from "express";
import upload from "../config/multer.js";
import { uploadFile } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload",  authMiddleware, upload.single("file"), uploadFile);

export default router;