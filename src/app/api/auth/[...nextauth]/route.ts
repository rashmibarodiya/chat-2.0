

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../prisma";
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "email" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("No credentials provided")
                }
                const { username, password, email } = credentials
                try {
                    let user = await prisma.user.findFirst({
                        where: {
                            username
                        }
                    })
                    if (user) {
                        const validPassword = await bcrypt.compare(password, user.password ||"")
                        if (!validPassword) {
                            throw new Error("Incorrect Password");
                        }
                        console.log("authentication successfull")
                        return {
                            id: user.id.toString(), name: username, email: email
                        }
                    }
                    else {
                        user = await prisma.user.create({
                            data: {
                                username,
                                password,
                                email
                            }
                        })

                        return {
                            id: user.id.toString(), name: username, email: email 
                        }
                    }
                } catch (e) {

                    throw new Error("Something went wrong while authorizing : " + e)
                }
                // return null;

            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            return true; // Allow sign-in
        },
        async redirect({ url, baseUrl }) {
            const redirectUrl = process.env.NEXTAUTH_URL || baseUrl;
            return url.startsWith(baseUrl) ? url : redirectUrl;
        },
        async session({ session, token }) {
            console.log("session *********",session)
            return session; 
        },
        async jwt({ token, user, account }) {
            console.log("token *********",token)
            return token; // Return the token object
        },
    },

    secret: process.env.NEXTAUTH_SECRET ?? "",
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

