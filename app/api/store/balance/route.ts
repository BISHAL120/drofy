import db from '@/lib/db';
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { id, balance, details = "-" } = body

        const user = await db.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                wallet: true,
            }
        })
        // return error if the user is  not found
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Recorn the Transaction History
        await db.walletTransaction.create({
            data: {
                userId: id,
                amount: balance,
                type: "MANUAL",
                walletBalance: user.wallet + balance,
                details
            }
        })


        // Update the user wallet
        await db.user.update({
            where: {
                id,
            },
            data: {
                wallet: user.wallet + balance,
            }
        })

        return NextResponse.json({ message: "Balance updated successfully" }, { status: 200 });
    } catch (error) {
        console.error('[BALANCE_POST]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
