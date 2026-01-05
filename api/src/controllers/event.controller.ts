import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const ingestEvent = async (req: Request, res: Response) => {
  const applicationId = (req as any).applicationId;
  const { type, message, payload } = req.body;

  if (!type || !message) {
    return res.status(400).json({
      message: "type and message are required",
    });
  }

  await prisma.event.create({
    data: {
      applicationId,
      type,
      message,
      payload,
    },
  });

  res.status(201).json({ success: true });
};

export const listEvents = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { appId } = req.params;

  console.log("User : ", userId, "App ID: ", appId);
  
  const app = await prisma.application.findFirst({
    where: { id: appId, userId },
  });

  if (!app) {
    return res.status(404).json({ message: "App not found" });
  }

  const events = await prisma.event.findMany({
    where: { applicationId: appId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  res.json(events);
};
