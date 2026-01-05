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

  export const listApiKeys = async (req: Request, res: Response) => {
    const { appId } = req.params;

    const keys = await prisma.apiKey.findMany({
      where: { applicationId: appId },
      orderBy: { createdAt: "desc" },
    });

    res.json(keys);
  }

  /**
   * Revoke an API key (disable access)
   */
  export const revokeApiKey = async (req: Request, res: Response) => {
    const { keyId } = req.params;

    const key = await prisma.apiKey.update({
      where: { id: keyId },
      data: {
        isActive: false,
        revokedAt: new Date(),
      },
    });

    res.json({ message: "API key revoked", key });
  }

  export const reactivateApiKey = async (req: Request, res: Response) => {
    const { keyId } = req.params;

    const key = await prisma.apiKey.update({
      where: { id: keyId },
      data: {
        isActive: true,
        revokedAt: null,
      },
    });

    res.json({ message: "API key reactivated", key });
  }

  export const deleteApiKey = async (req: Request, res: Response) => {
    const { keyId } = req.params;

    await prisma.apiKey.delete({
      where: { id: keyId },
    });

    res.json({ message: "API key deleted permanently" });
  }
