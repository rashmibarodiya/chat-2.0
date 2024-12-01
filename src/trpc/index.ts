import { router, publicProcedure } from './trpc';
import prisma from "./../app/api/prisma"
import { chatRouter } from './routers/chatRouter';
import { number, z } from "zod"
import { getUserRouter } from './routers/getUser';
import{getIdRouter} from "./routers/getUserId"

export const appRouter = router({
    chat: chatRouter,
    getAll :getUserRouter,
    getId:getIdRouter

})



export type AppRouter = typeof appRouter