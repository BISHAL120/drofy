import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
// import { v4 as uuidv4 } from "uuid";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import db from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            authorize: async ({ email, password }) => {
                if (typeof email !== "string" || typeof password !== "string") {
                    throw new Error("Invalid credentials");
                }

                const user = await db.user.findUnique({
                    where: { email },
                });

                /* if (user) {
                  await db.session.create({
                    data: {
                      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                      sessionToken: uuidv4(),
                      userId: user?.id,
                      email: email,
                    },
                  });
                } */

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const passwordMatch = await bcrypt.compare(password, user?.password);

                if (!passwordMatch) {
                    throw new Error("Invalid credentials");
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            console.log(user)
            /*    await db.user.update({
                   where: {
                       id: user.id,
                   },
                   data: {
                       emailVerified: new Date(),
                   },
               }); */
            /* if (user.id) {
              await db.session.create({
                data: {
                  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                  sessionToken: uuidv4(),
                  userId: user.id,
                  email: user.email,
                },
              });
            } */
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth Without Email Verification
            if (account?.provider === "google") {
                return true;
            }

            if (account && account.provider === "credentials" && user) {
                return true;
            }
            return false;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.isPaid = user.isPaid;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role as string;
                session.user.isPaid = token.isPaid as boolean;
            }
            return session;
        },
    },
});