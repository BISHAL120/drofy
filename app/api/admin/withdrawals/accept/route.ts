import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json()

        const { id } = body

        if (!id) {
            return NextResponse.json(
                { message: "Withdrawal Request ID is required" },
                { status: 400 }
            )
        }

        /* Find the withdrawal request */
        const requestData = await db.withdrawalRequest.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                amount: true,
                method: true,
                reseller: {
                    select: {
                        id: true,
                        wallet: true
                    }
                }
            }
        })

        if (!requestData) {
            return NextResponse.json(
                { message: 'Withdrawal info not found' },
                { status: 400 }
            )
        }

        /* Update the user wallet balance */
        const updateUserData = await db.user.update({
            where: {
                id: requestData.reseller.id
            },
            data: {
                wallet: {
                    decrement: requestData.amount
                }
            }
        })

        /* Add a balance statement */
        await db.walletTransaction.create({
            data: {
                userId: requestData.reseller.id,
                amount: -requestData.amount,
                type: 'MANUAL',
                details: `${requestData.method} মাধ্যমে ${requestData.amount} টাকা উত্তোলন করেছেন`,
                walletBalance: updateUserData.wallet
            }
        })

        /* Update the withdraw status */
        await db.withdrawalRequest.update({
            where: {
                id
            },
            data: {
                status: 'APPROVED',
                processedDate: new Date()
            }
        })



        /* 
        1. Find the request by id
        2. find the user and walet balance
        3. Reduce the walet balance by the amount
        4. create a balance statement history
        5. Update the request status to approved and proceduceed time
        6. Send a success notification to the user
        */

        // Return success response
        return NextResponse.json(
            { message: 'Request processed successfully' },
            { status: 200 }
        )

    } catch (error) {
        // Handle errors
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
