import { Router } from "express";
import aiController from "../controllers/aiController.js";
const router = Router();

router.post("/api/ai/review", aiController.review);

export default router;
