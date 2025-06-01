// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        role?: string[]; // Add role property
        phone: string;
        isActive?: boolean;
    }

    interface Session {
        user: {
            role?: string[]; // Add role property
            phone: string;
            isActive?: boolean;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string[]; // Add role property
        phone: string;
        isActive?: boolean;
    }
}