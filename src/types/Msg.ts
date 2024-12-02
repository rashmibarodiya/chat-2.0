import { z } from "zod"

export const msgSchema = z.object({
    senderId: z.number(),
    receiverId: z.number(),
    message: z.string(),
    conversationId: z.number().nullable()
})