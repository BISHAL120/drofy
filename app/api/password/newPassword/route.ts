import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { userEmail, code, password } = body
        console.log(code)

        // check if userEmail, code, password is provided
        if (!userEmail || !code || !password) {
            return NextResponse.json({ message: "Missing userEmail or code or password" }, { status: 400 })
        }

        // find code in db
        const verifyCode = await db.verification.findFirst({
            where: {
                email: userEmail
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        if (!verifyCode) {
            return NextResponse.json({ message: "কোডটি সঠিক নয়!" }, { status: 400 })
        }

        // Check if code matches
        if (verifyCode.code !== Number(code)) {
            return NextResponse.json({ message: "কোডটি সঠিক নয়!" }, { status: 400 })
        }

        // Check if expired
        if (verifyCode.expiresAt < new Date()) {
            // delete previous codes from db
            await db.verification.deleteMany({
                where: {
                    email: userEmail
                }
            })
            return NextResponse.json({ message: "কোডের মেয়াদ শেষ! পুনঃ প্রদান করুন!" }, { status: 400 })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
          await db.user.update({
            where: {
                id: verifyCode.userId
            },
            data: {
                password: hashedPassword
            }
        }) 

            // delete all related codes
            await db.verification.deleteMany({
                where: {
                    email: userEmail
                }
            })


        return NextResponse.json({ message: "পাসওয়ার্ড পরিবর্তন সম্পন্ন হয়েছে", data: { userEmail, code, hashedPassword, verifyCode } }, { status: 200 })

    } catch (error) {
        console.log("Password_verifyCode_POST", error)
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}