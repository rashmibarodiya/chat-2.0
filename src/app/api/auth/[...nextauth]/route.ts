import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Implement your custom user authentication logic here
                const user = { id: "1", name: "John Doe" };
                if (user) {
                    return user;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            return true; // Allow sign-in
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async session({ session, token }) {
            return session; // Return the session object
        },
        async jwt({ token, user, account }) {
            return token; // Return the token object
        },
    },
};

export default NextAuth(authOptions);
