




import { initTRPC } from "@trpc/server";
import prisma from "@/app/api/prisma";
import { chatRouter } from "./routers/chatRouter";
const t = initTRPC.create()

export const appRouter = t.router({
    chat: chatRouter
})

export type AppRouter = typeof appRouter
export const publicProcedure = t.procedure
export const router = t.router