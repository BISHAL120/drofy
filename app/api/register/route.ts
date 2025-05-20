import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, number, password, email, address } = body;

        // Validation checks
        if (!name || !number || !password) {
            return NextResponse.json(
                { message: 'নাম নাম্বার এবং পাসওয়ার্ড দিন' },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return NextResponse.json(
                { message: 'ইমেইল টি সঠিক নয়' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: {
                phone: number,
            }
        });
        console.log(existingUser)

        if (existingUser) {
            return NextResponse.json(
                { message: 'নাম্বারটি ইতিমধ্যে ব্যবহৃত হয়েছে' },
                { status: 409 }
            );
        }

        const userCount = await db.user.count();
        const isAdmin = userCount === 0; // First user becomes admin

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await db.user.create({
            data: {
                name,
                phone: number,
                password: hashedPassword,
                email: email || "",
                address: address || "",
                role: isAdmin ? "ADMIN" : "USER",
                referralCode: userCount + 1,
            }
        });

        return NextResponse.json(
            { message: 'একাউন্ট তৈরি সম্পন্ন হয়েছে', user },
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
