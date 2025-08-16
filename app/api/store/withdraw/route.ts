import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const body = await req.json()

        console.log(body)

        const { paymentType, amount, accountNumber, resellerId } = body

        if (!paymentType) {
            return NextResponse.json({ message: 'মাধ্যম নির্বাচন করুন!' }, { status: 400 })
        }

        if (!amount) {
            return NextResponse.json({ message: 'টাকার পরিমাণ দিন!' }, { status: 400 })
        }

        if (!accountNumber) {
            return NextResponse.json({ message: 'একটি নাম্বার দিন!' }, { status: 400 })
        }
        /* Check if the user have enough balance */
        const user = await db.user.findUnique({
            where: {
                id: resellerId
            },
            select: {
                wallet: true
            }
        })

        if (!user) {
            return NextResponse.json({ message: 'ইউজার খুঁজে পাওয়া যায়নি!' }, { status: 400 })
        }

        if (user.wallet < amount) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নাই!' }, { status: 400 })
        }

        /* get tee request count */
        const requestCount = await db.withdrawalRequest.count()
        /* Add the withdraw Request */

        /* Update the user wallet */
        /* TODO: When intregate bkash then uncomment this for auto statement */
        /*  await db.user.update({
             where: {
                 id: resellerId
             },
             data: {
                 wallet: user.wallet - amount
             }
         }) */

        /* Add Transaction History */

        /* TODO: When intregate bkash then uncomment this for auto statement */
        /*  await db.walletTransaction.create({
             data: {
                 userId: resellerId,
                 amount: -amount,
                 type: "BKASH",
                 details: `বিকাশে টাকা উত্তোলন করেছেন পরিমাণ ${-amount}`,
                 walletBalance: user.wallet - amount
             }
         }) */

        const result = await db.withdrawalRequest.create({
            data: {
                requestId: `REQ-${requestCount + 1}`,
                amount,
                method: paymentType,
                number: `+88${accountNumber}`,
                resellerId: resellerId,
            }
        })

        return NextResponse.json({ message: "সফলভাবে অনুরোধ করা হয়েছে", data: result }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}