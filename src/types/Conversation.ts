
import {z} from "zod"
import { msgSchema } from "./Msg"

export const Conversation = z.object({
    message:z.array(msgSchema).nullable(),
    status:z.number()
})