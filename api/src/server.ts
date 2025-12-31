import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


import authRoutes from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User ID
 */
app.get("/me", authMiddleware, (req, res) => {
  res.json({ userId: (req as any).userId });
});


app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
