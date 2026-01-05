import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createApp = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { name } = req.body;

  const app = await prisma.application.create({
    data: { name, userId },
  });

  res.json(app);
};

export const listApps = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const apps = await prisma.application.findMany({
    where: { userId },
  });

  res.json(apps);
};

export const removeApp = async (req: Request, res: Response) => {
  const { appId } = req.params;
  const userId = (req as any).userId;

  const app = await prisma.application.findFirst({
    where: { id: appId, userId }
  });

  if (!app) {
    return res.status(404).json({ message: "Application not found" });
  }

  await prisma.application.delete({
    where: { id: appId }
  });

  res.json({ success: true });
}