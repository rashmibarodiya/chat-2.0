import { router, publicProcedure } from '../trpc';
import prisma from "../../app/api/prisma"

import { number, z } from "zod"


export const chatRouter = router({

    sendMsg: publicProcedure.input(
        z.object({
            senderMail: z.string(),
            receiver: z.number(),
            mes: z.string().min(1, "Message can not be empty")
        })
    ).output(
        z.object({
            status: z.number(),
            msg: z.string()
        })
    ).mutation(async ({ input }) => {
        try {
            const { senderMail, receiver, mes } = input
            const res = await prisma.user.findFirst({
                where: {
                    email: senderMail
                }, select: {
                    id: true
                }
            })

            if(!res){
                return{
                    status:500,
                    msg:"sender not found something went wrong"
                }
            }
            const newMsg = await prisma.message.create({
                data: {
                    senderId: res.id,
                    receiverId: receiver,
                    message: mes
                }
            })
            return {
                status: 200,
                msg: "msg sent succssfully"
            }
        } catch (e) {
            return {
                status: 500,
                msg: "something went wrong " + e
            }
        }

    }),
    check: publicProcedure.query(() => {
        return {
            msg: "hi threre"
        };
    })

})