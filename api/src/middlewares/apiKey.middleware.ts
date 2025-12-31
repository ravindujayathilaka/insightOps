import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export const apiKeyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.headers["x-api-key"];

  if (!key || typeof key !== "string") {
    return res.status(401).json({ message: "API key required" });
  }

  const apiKey = await prisma.apiKey.findUnique({
    where: { key },
    include: { application: true },
  });

  if (!apiKey) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  (req as any).applicationId = apiKey.applicationId;
  next();
};
