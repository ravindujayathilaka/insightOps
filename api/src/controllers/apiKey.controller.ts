import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { generateApiKey } from "../utils/apiKey";

export const createApiKey = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { appId } = req.params;

  const app = await prisma.application.findFirst({
    where: { id: appId, userId },
  });

  if (!app) {
    return res.status(404).json({ message: "App not found" });
  }

  const apiKey = await prisma.apiKey.create({
    data: {
      key: generateApiKey(),
      applicationId: appId,
    },
  });

  res.json(apiKey);
};
