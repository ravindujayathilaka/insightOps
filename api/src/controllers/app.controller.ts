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
