import { router, publicProcedure } from './trpc';
import prisma from "./../app/api/prisma"
import { chatRouter } from './routers/chatRouter';
import { number, z } from "zod"


export const appRouter = router({
    chat: chatRouter

})



export type AppRouter = typeof appRouter