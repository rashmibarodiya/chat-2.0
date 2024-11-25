import { AppRouter } from "@/trpc/trpc";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({})