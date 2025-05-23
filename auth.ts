import NextAuth from "next-auth";
// import { v4 as uuidv4 } from "uuid";
import { PrismaAdapter } from "@auth/prisma-adapter";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "./lib/db";


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Credentials({
            authorize: async ({ number, password }) => {
                if (typeof number !== "string" || typeof password !== "string") {
                    throw new Error("Invalid credentials");
                }
                const user = await db.user.findUnique({
                    where: { phone: number },
                    select: {
                        id: true,
                        password: true,
                        name: true,
                        phone: true,
                        role: true,
                    },
                });

                if (!user || !user.password) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user?.password);

                if (!passwordMatch) {
                    throw new Error("Invalid credentials");
                }
                /*  if (user && passwordMatch) {
                } */

                /* if (user) {
                  await db.session.create({
                    data: {
                      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                      sessionToken: uuidv4(),
                      userId: user?.id,
                      number: number,
                    },
                  });
                } */

                console.log(user)

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.phone = user.phone;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.phone = token.phone as string;
                session.user.role = token.role as string[];
            }
            return session;
        },
    },
});