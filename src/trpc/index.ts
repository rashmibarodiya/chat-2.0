import { router, publicProcedure } from './trpc';
import prisma from "./../app/api/prisma"
import { chatRouter } from './routers/chatRouter';
import { number, z } from "zod"
import { getUserRouter } from './routers/getUser';


export const appRouter = router({
    chat: chatRouter,
    getAll :getUserRouter

})



export type AppRouter = typeof appRouter