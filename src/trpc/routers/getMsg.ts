import { router, publicProcedure } from "../trpc";
import prisma from "../../app/api/prisma";
import { z } from "zod";

export const getMessageRouter = router({
    getMsg: publicProcedure.input(
        z.object({
            userId: z.number(),
            receiverId: z.number()
        })
    )
    .output(
        z.object({
            msgs: z.array(
                z.object({
                    msg: z.string(),
                    sender: z.number(),
                    receiver: z.number(),
                    time: z.date()
                })
            )
        })
    )
    .query(async ({ input }) => {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: input.userId, receiverId: input.receiverId },
                    { senderId: input.receiverId, receiverId: input.userId }
                ]
            },
            select: {
                message: true,
                senderId: true,
                receiverId: true,
                createdAt: true
            }
        });

        return {
            msgs: messages.map(msg => ({
                msg: msg.message,
                sender: msg.senderId,
                receiver: msg.receiverId,
                time: msg.createdAt
            }))
        };
    })
});
