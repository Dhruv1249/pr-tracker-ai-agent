import { Router } from "express";
import aiController from "../controllers/aiController.js";
const router = Router();

router.post("/api/ai/chat", aiController.chat);

export default router;
