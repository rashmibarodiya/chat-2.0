




import { initTRPC } from "@trpc/server";
import prisma from "@/app/api/prisma";

const t = initTRPC.create()
export const publicProcedure = t.procedure
export const router = t.router



