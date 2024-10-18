import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { sessionMiddleware } from "../middleware/sessionMiddleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post('/logout', sessionMiddleware, logout);

export default router;
