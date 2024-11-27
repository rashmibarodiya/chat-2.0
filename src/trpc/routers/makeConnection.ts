import { router, publicProcedure } from "../trpc"
import prisma from "../../app/api/prisma"
import { number, z } from "zod"


export const connectRouter = router({

    connect: publicProcedure.input(
        z.object({
        sender: z.number(),
        reciever: z.number()
    })).output(
        z.object({
        status: z.number(),
        msg: z.string()
    })).mutation(async({input})=>{

       try{
        const user = await prisma.user.findFirst({
            where:{
                id:input.sender
            }
        })
        if(!user){
            throw new Error("No sender exist")
        }
        user.connections.push(input.reciever)
        console.log("connection added successfully")
        return{
            status:200,
            msg:"Connection added successfully"
        }
       }catch(e){
        console.log("something went wrong in adding connections")
        return{
            status:500,
            msg:"Adding connection failed"
        }
       }
    })

})