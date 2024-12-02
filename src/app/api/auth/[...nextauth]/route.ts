

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
                console.log("hi there dhfdhdkhfd", credentials)
                if (!credentials) {
                    throw new Error("No credentials provided")
                }
                const { username, password, email } = credentials
                try {
                    console.log("try ", credentials)

                    let user = await prisma.user.findFirst({
                        where: {
                            username
                        }
                    })
                    if (!user) {
                        user = await prisma.user.findFirst({
                            where: {
                                email: username
                            }
                        })
                    }
                    console.log("moye moye ", credentials)
                    if (user) {
                        const validPassword = await bcrypt.compare(password, user.password || "")
                        if (!validPassword) {
                            throw new Error("Incorrect Password");
                        }
                        console.log("authentication successfull")
                        return {
                            id: user.id.toString(), name: username, email: user.email
                        }
                    }
                    else {
                        console.log("else block", user)
                        const hashedPassword = await bcrypt.hash(password, 10);
                        user = await prisma.user.create({
                            data: {
                                username,
                                password: hashedPassword,
                                email
                            }
                        })
                        console.log("user ", user)
                        return {
                            id: user.id.toString(), name: username, email: email
                        }
                    }
                } catch (e) {
                    console.log("error ", e)
                    throw new Error("Something went wrong while authorizing : " + e)
                }
                // return null;

            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user || !user.email || !user.name) {
                console.error("user or email or name missing", user)
                return false
            }
            let users = await prisma.user.findFirst({
                where: {
                    email: user?.email || ""
                }
            })
            if (users) {
                console.log("user already exists ")
            } else {
                users = await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name
                    }
                })
            }
            console.log("signing ", user)
            console.log("signing ", account)
            console.log("signing ", profile)
            console.log("user sign in successfully ", user)
            return true;
        },
        async redirect({ url, baseUrl }) {
            const redirectUrl = process.env.NEXTAUTH_URL || baseUrl;
            return url.startsWith(baseUrl) ? url : redirectUrl;
        },
        async jwt({ token, user, account }) {
            console.log("token *********", token)
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
            }
            return token; 
        },
        async session({ session, token }) {
            console.log("session in session*********", session)
            console.log("token in session*********", token)
            // const id = token.id

            if (token) {
            
                session.user = { name: token.name, email: token.email }
            }
            return session;
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

