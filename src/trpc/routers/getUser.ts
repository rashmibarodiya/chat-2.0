
import {router,publicProcedure} from "../trpc"
import { UsersSchema } from "@/types/User"
import prisma from "../../app/api/prisma"

 export const getUserRouter = router({
    getUser : publicProcedure.query(async()=>{
        try{
            const users = await prisma.user.findMany()
            const validateUsers = UsersSchema.parse(users)
            return{
                msg:"user gets successful",
                users:validateUsers
            }
        }catch(e){
            console.error("something went wrong while getting users : ",e)
            throw new Error("failed to fetch users")
        }
        
    })
})
