/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Manage applications
 */

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createApp, listApps } from "../controllers/app.controller";

const router = Router();

/**
 * @swagger
 * /apps:
 *   post:
 *     summary: Create application
 *     tags: [Applications]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application created
 */
router.post("/", authMiddleware, createApp);

/**
 * @swagger
 * /apps:
 *   get:
 *     summary: List user applications
 *     tags: [Applications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of applications
 */
router.get("/", authMiddleware, listApps);

export default router;
