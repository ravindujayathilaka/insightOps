/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: View application analytics
 */

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { apiKeyUsage, eventsByType, eventsOverTime } from "../controllers/analytics.controller";

const router = Router();

/**
 * @swagger
 * /analytics/{appId}/events-by-type:
 *   get:
 *     summary: Get event counts grouped by type
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *     responses:
 *       200:
 *         description: Event counts by type
 */
router.get("/:appId/events-by-type", authMiddleware, eventsByType);

/**
 * @swagger
 * /analytics/{appId}/events-over-time:
 *   get:
 *     summary: Get event counts per day
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *     responses:
 *       200:
 *         description: Event counts over time
 */
router.get("/:appId/events-over-time", authMiddleware, eventsOverTime);

/**
 * @swagger
 * /analytics/{appId}/api-key-usage:
 *   get:
 *     summary: Get API key usage stats for an application
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *     responses:
 *       200:
 *         description: API key usage
 */
router.get("/:appId/api-key-usage", authMiddleware, apiKeyUsage);

export default router;
