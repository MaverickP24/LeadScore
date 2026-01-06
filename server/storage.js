import { db } from "./db.js";

export const storage = {
    async getLeads() {
        return db.lead.findMany({
            orderBy: { score: 'desc' }
        });
    },

    async getLead(id) {
        return db.lead.findUnique({
            where: { id }
        });
    },

    async getLeadByEmail(email) {
        return db.lead.findUnique({
            where: { email }
        });
    },

    async createLead(data) {
        return db.lead.create({
            data
        });
    },

    async updateLeadScore(id, score) {
        await db.lead.update({
            where: { id },
            data: {
                score,
                updatedAt: new Date()
            }
        });
    },

    async deleteLead(id) {
        await db.lead.delete({
            where: { id }
        });
    },

    async createEvent(data) {
        // Ensure payload is stringified for SQLite if needed (though Prisma might handle it if type was Json, but I made it String)
        const payload = typeof data.payload === 'string' ? data.payload : JSON.stringify(data.payload || {});

        return db.event.create({
            data: {
                ...data,
                payload
            }
        });
    },

    async getLeadEvents(leadId) {
        const events = await db.event.findMany({
            where: { leadId },
            orderBy: { timestamp: 'desc' }
        });

        // Parse payload back to JSON
        return events.map(e => ({
            ...e,
            payload: JSON.parse(e.payload)
        }));
    },

    async getAllEvents() {
        const events = await db.event.findMany({
            take: 100,
            orderBy: { timestamp: 'desc' }
        });
        return events.map(e => ({
            ...e,
            payload: JSON.parse(e.payload)
        }));
    },

    async getRules() {
        return db.scoringRule.findMany();
    },

    async getRuleByEventType(eventType) {
        return db.scoringRule.findUnique({
            where: { eventType }
        });
    },

    async createRule(data) {
        return db.scoringRule.create({
            data
        });
    },

    async updateRule(id, data) {
        return db.scoringRule.update({
            where: { id },
            data
        });
    },

    async addScoreHistory(data) {
        await db.scoreHistory.create({
            data
        });
    },

    async getScoreHistory(leadId) {
        return db.scoreHistory.findMany({
            where: { leadId },
            orderBy: { timestamp: 'desc' }
        });
    },
};
