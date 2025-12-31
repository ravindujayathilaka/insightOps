/**
 * @swagger
 * tags:
 *   name: API Keys
 *   description: Manage API keys
 */

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createApiKey } from "../controllers/apiKey.controller";

const router = Router();

/**
 * @swagger
 * /api-keys/{appId}:
 *   post:
 *     summary: Generate API key for application
 *     tags: [API Keys]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: API key generated
 */
router.post("/:appId", authMiddleware, createApiKey);

export default router;
