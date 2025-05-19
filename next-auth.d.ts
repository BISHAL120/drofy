// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        role?: string; // Add role property
        isPaid?: boolean; // Add isPaid property
    }

    interface Session {
        user: {
            role?: string; // Add role property
            isPaid?: boolean; // Add isPaid property
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string; // Add role property
        isPaid?: boolean; // Add isPaid property
    }
}