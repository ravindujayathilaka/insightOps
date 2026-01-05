import { Router } from "express";
import { ingestEvent } from "../controllers/event.controller";
import { listEvents } from "../controllers/event.controller";
import { apiKeyMiddleware } from "../middlewares/apiKey.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event ingestion
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Ingest event
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, message]
 *             properties:
 *               type:
 *                 type: string
 *               message:
 *                 type: string
 *               payload:
 *                 type: object
 *     responses:
 *       201:
 *         description: Event stored
 */
router.post("/", apiKeyMiddleware, ingestEvent);


/**
 * @swagger
 * /events/apps/{appId}/events:
 *   get:
 *     summary: List application events
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *     responses:
 *       200:
 *         description: Events list
 */
router.get("/apps/:appId/events", authMiddleware, listEvents);


export default router;
