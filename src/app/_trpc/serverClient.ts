import { link } from "fs"
import {appRouter} from "../../trpc/trpc"
import { httpBatchLink } from "@trpc/client"

const serverClient = appRouter.createCaller({
    link:[httpBatchLink({url : `http:localhost:3000/api/trpc`})]
})