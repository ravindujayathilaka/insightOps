import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export const eventsByType = async (req: Request, res: Response) => {
    const { appId } = req.params;
    const userId = (req as any).userId;

    const app = await prisma.application.findFirst({
        where: { id: appId, userId }
    });

    if (!app) return res.status(404).json({ message: "Application not found" });

    const counts = await prisma.event.groupBy({
        by: ["type"],
        where: { applicationId: appId },
        _count: { type: true }
    });

    res.json(counts);
}

/**
 * Get event counts over time (daily)
 */
export const eventsOverTime = async (req: Request, res: Response) => {
    const { appId } = req.params;
    const userId = (req as any).userId;

    const app = await prisma.application.findFirst({
        where: { id: appId, userId }
    });

    if (!app) return res.status(404).json({ message: "Application not found" });

    const events = await prisma.event.findMany({
        where: { applicationId: appId },
        select: { createdAt: true }
    });

    // Aggregate daily
    const dailyCounts: Record<string, number> = {};
    events.forEach(e => {
        const day = e.createdAt.toISOString().split("T")[0]; // YYYY-MM-DD
        dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    });

    res.json(dailyCounts);
}

export const apiKeyUsage = async (req: Request, res: Response) => {
    const { appId } = req.params;
    const userId = (req as any).user.id; // from authMiddleware

    // Ensure the app belongs to the user
    const app = await prisma.application.findFirst({
        where: { id: appId, userId },
    });

    if (!app) return res.status(404).json({ message: "Application not found" });

    // Get all API keys for the application
    const keysWithEvents = await prisma.apiKey.findMany({
        where: { applicationId: appId },
        include: {
            application: {
                include: {
                    events: true // all events for this application
                }
            }
        }
    });

    // Map results
    const usage = keysWithEvents.map(key => ({
        keyId: key.id,
        isActive: key.isActive,
        createdAt: key.createdAt,
        // Approximate: show total events in the application
        eventsCount: key.application.events.length
    }));

    res.json(usage);
}
