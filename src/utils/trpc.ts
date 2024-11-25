import { createTRPCReact, CreateTRPCReact } from "@trpc/react-query";
import type {AppRouter} from "../app/api/trpc/[trpc]"

export const trpc = createTRPCReact<AppRouter>()