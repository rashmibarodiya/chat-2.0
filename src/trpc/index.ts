import { router, publicProcedure } from './trpc';
import prisma from "./../app/api/prisma"
import { chatRouter } from './routers/chatRouter';
import { number, z } from "zod"
import { getUserRouter } from './routers/getUser';
import{getIdRouter} from "./routers/getUserId"
import {getConv} from "./routers/conversation/getConversationId"
import {getConvRouter} from "./routers/conversation/getConversation"

import { getMessageRouter } from './routers/getMsg';

export const appRouter = router({
    chat: chatRouter,
    getAll :getUserRouter,
    getId:getIdRouter,
    getConvId:getConv,
    getConv:getConvRouter,
    getMsgs : getMessageRouter
})



export type AppRouter = typeof appRouter