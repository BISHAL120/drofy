import db from "@/lib/db"
import { NextResponse } from "next/server"
import { Resend } from 'resend';
import PasswordResetEmail from '@/components/auth/forgot-password/password-reset-email';
const COMPANY_NAME = "Drofy";
const SUPPORT_EMAIL = "support@drofy.com";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.email) {
            return NextResponse.json({
                message: "একটি সঠিক ই-মেইল প্রদান করুন",
            }, { status: 400 });
        }

        // Check if email exists in database
        const user = await db.user.findUnique({
            where: {
                email: body.email,
            }
        });

        if (!user) {
            return NextResponse.json({
                message: "ই-মেইলটি সঠিক নয়!",
            }, { status: 400 });
        }

        // check for existing code
        const existingCode = await db.verification.findFirst({
            where: {
                email: body.email,
            },
            orderBy: {
                createdAt: "desc",
            }
        })

        // if exist & does't expired
        if (existingCode && existingCode.expiresAt > new Date()) {
            return NextResponse.json({
                message: "ইতিমধ্যে একটি কোড পাঠানো হয়েছে!",
            }, { status: 400 });
        } else {
            // delete existing codes
            await db.verification.deleteMany({
                where: {
                    email: body.email,
                }
            })
        }

        // Generate reset token
        const code = Math.floor(100000 + Math.random() * 900000);

        // Save reset token to database
        await db.verification.create({
            data: {
                code,
                userId: user.id,
                email: user.email,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            }
        });

        // Initialize email client
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send reset password email
        const resendResponse = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: user.email,
            subject: 'Reset Your Password - Drofy',
            react: PasswordResetEmail({
                code: code.toString(),
                userEmail: user.email,
                companyName: COMPANY_NAME,
                supportEmail: SUPPORT_EMAIL
            }),
        });

        console.log("Resend Response: ", resendResponse);

        return NextResponse.json({
            message: "কোড ইমেইলে পাঠানো হয়েছে"
        }, { status: 200 });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json({
            message: "server error"
        }, { status: 500 });
    }
}