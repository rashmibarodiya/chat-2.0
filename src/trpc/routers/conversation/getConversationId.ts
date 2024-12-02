import { router, publicProcedure } from "../../trpc";
import prisma from "@/app/api/prisma";
import { z } from "zod";

export const getConv = router({
    getConvId: publicProcedure
        .input(
            z.object({
                userIds: z.array(z.number()), 
            })
        )
        .output(
            z.object({
                convId: z.number().nullable(), 
                status: z.number(),
            })
        )
        .query(async ({ input }) => {
            const { userIds } = input;

            const conversation = await prisma.conversation.findFirst({
                where: {
                    User: {
                        every: {
                            id: {
                                in: userIds,
                            },
                        },
                    },
                },
            });

            return conversation
                ? {
                      convId: conversation.id,
                      status: 200,
                  }
                : {
                      convId: null, 
                      status: 404,
                  };
        }),
});
