import { router, publicProcedure } from "../trpc"
import prisma from "../../app/api/prisma"
import { z } from "zod"

export const getIdRouter = router({
    getUsesId: publicProcedure.input(
        z.object({
            email: z.string()
        })).
        output(
            z.object({
                id: z.number().nullable()
            })).
        query(async ({ input }) => {
            const user = await prisma.user.findFirst({
                where: {
                    email: input.email
                },
                select: {
                    id: true
                }
            })

            return { id: user?.id || null };
        })
})
