import { router, publicProcedure } from "../../trpc";
import prisma from "@/app/api/prisma";
import { z } from "zod";
import { msgSchema } from "@/types/Msg";
import { Conversation } from "@/types/Conversation";
export const getConvRouter = router({
    getConv: publicProcedure
        .input(
            z.object({
                convId: z.number()
            })
        )
        .output(
            Conversation
        )
        .query(async ({ input }) => {
            const { convId } = input;

            const conversation = await prisma.conversation.findFirst({
                where: {
                    id: convId,

                }, include: {
                    Message: true
                }
            });

            return conversation
                ? {
                    message:conversation.Message.map((msg) => ({
                        senderId: msg.senderId,
                        receiverId: msg.receiverId,
                        message: msg.message,
                        conversationId: msg.conversationId 
                    })),
                    status: 200,
                }
                : {
                    message: null,
                    status: 404,
                };
        }),
});
