import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
    try {

        const body = await req.json()
        const { id, status } = body

        if (!id) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
        }

        if (!status) {
            return NextResponse.json({ error: "Order status is required" }, { status: 400 })
        }

        // Find the order
        const order = await db.order.findUnique({
            where: {
                id
            }, select: {
                resellerId: true,
                totalProfit: true,
                totalPrice: true,
                customerName: true,
            }
        })

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 400 })
        }

        // Update the order status
        await db.order.update({
            where: {
                id
            },
            data: {
                status
            }
        })

        // find the user wallet
        const userWallet = await db.user.findUnique({
            where: {
                id: order.resellerId
            },
            select: {
                wallet: true
            }
        })

        // Update the user wallet
        if (status === "DELIVERED") {
            await db.user.update({
                where: {
                    id: order.resellerId
                },
                data: {
                    wallet: {
                        increment: order.totalProfit as number
                    },
                },
            })
        }

        if (status === "CANCELLED") {
            // Minus the return fee from wallet
            await db.user.update({
                where: {
                    id: order.resellerId
                },
                data: {
                    wallet: {
                        decrement: 20
                    },
                    totalRevenue: {
                        decrement: Number(order.totalPrice)
                    }

                }
            })

            // Add a transactio history
            await db.walletTransaction.create({
                data: {
                    userId: order.resellerId,
                    amount: -20,
                    type: "AUTOMATION",
                    details: `রিটার্ন, চার্জ কর্তন হয়েছে। কাস্টমারের নাম: ${order.customerName}`,
                    walletBalance: (userWallet?.wallet as number) - 20
                }
            })
        }

        return NextResponse.json(
            { message: "Order status updated successfully" },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "ORDER_STATUS_UPDATE_FAILED_PATCH" }, { status: 500 })
    }
}