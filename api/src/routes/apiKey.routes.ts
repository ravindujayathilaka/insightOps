/**
 * @swagger
 * tags:
 *   name: API Keys
 *   description: Manage API keys
 */

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createApiKey, deleteApiKey, listApiKeys, reactivateApiKey, revokeApiKey } from "../controllers/apiKey.controller";

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

/**
 * @swagger
 * /api-keys/{appId}:
 *   get:
 *     summary: List all API keys for an application
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
 *         description: List of API keys
 */
router.get("/:appId", authMiddleware, listApiKeys);

/**
 * @swagger
 * /api-keys/{appId}/{keyId}/revoke:
 *   post:
 *     summary: Revoke an API key
 *     tags: [API Keys]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *       - in: path
 *         name: keyId
 *         required: true
 *     responses:
 *       200:
 *         description: API key revoked
 */
router.post("/:appId/:keyId/revoke", authMiddleware, revokeApiKey);

/**
 * @swagger
 * /api-keys/{appId}/{keyId}/reactivate:
 *   post:
 *     summary: Reactivate a revoked API key
 *     tags: [API Keys]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *       - in: path
 *         name: keyId
 *         required: true
 *     responses:
 *       200:
 *         description: API key reactivated
 */
router.post("/:appId/:keyId/reactivate", authMiddleware, reactivateApiKey);

/**
 * @swagger
 * /api-keys/{appId}/{keyId}:
 *   delete:
 *     summary: Delete an API key permanently
 *     tags: [API Keys]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *       - in: path
 *         name: keyId
 *         required: true
 *     responses:
 *       200:
 *         description: API key deleted permanently
 */
router.delete("/:appId/:keyId", authMiddleware, deleteApiKey);


export default router;
