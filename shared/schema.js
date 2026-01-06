import { z } from "zod";

export const insertLeadSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    company: z.string().optional(),
    status: z.enum(["new", "engaged", "qualified", "converted"]).default("new"),
});

export const insertEventSchema = z.object({
    leadId: z.number().positive(),
    eventType: z.string().min(1),
    payload: z.record(z.any()).optional().default({}),
});

export const insertScoringRuleSchema = z.object({
    eventType: z.string().min(1),
    points: z.number().int(),
    isActive: z.boolean().optional().default(true),
});

export const insertScoreHistorySchema = z.object({
    leadId: z.number().positive(),
    scoreChange: z.number().int(),
    newScore: z.number().int(),
    reason: z.string().min(1),
});
