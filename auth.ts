import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { v4 as uuidv4 } from "uuid";
import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import db from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        /* Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }), */
        Credentials({
            authorize: async ({ number, password }) => {
                if (typeof number !== "string" || typeof password !== "string") {
                    throw new Error("Invalid credentials");
                }

                const user = await db.user.findUnique({
                    where: { phone: number },
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
    // events: {
    //     async linkAccount({ user }) {
    //         console.log(user)
    //         /*    await db.user.update({
    //                where: {
    //                    id: user.id,
    //                },
    //                data: {
    //                    emailVerified: new Date(),
    //                },
    //            }); */
    //         /* if (user.id) {
    //           await db.session.create({
    //             data: {
    //               expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    //               sessionToken: uuidv4(),
    //               userId: user.id,
    //               email: user.email,
    //             },
    //           });
    //         } */
    //     },
    // },
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
                // To add any field first add it in next-auth.ts File then add in token and session
                token.name = user.name;
                token.phone = user.phone;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // To add any field first add it in next-auth.ts File then add in token and session
                session.user.name = token.name as string;
                session.user.phone = token.phone as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
});