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
        // TODO: Active when payment i automated
        /* const userWallet = await db.user.findUnique({
            where: {
                id: order.resellerId
            },
            select: {
                wallet: true
            }
        }) */


        // Uncomment for auto profit distribution
        // Handle Logic for Delivered Order
        /*  if (status === "DELIVERED") {
             // Add the profit to the user wallet
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
 
             // Distribute the commission
             // handleCommission(order.resellerId, Number(order.totalPrice))
         } */

        // Handle Logic for Cancelled Order
        if (status === "CANCELLED") {
            // Minus the return fee from wallet
            await db.user.update({
                where: {
                    id: order.resellerId
                },
                data: {
                    // Uncomment for auto cancel fee Deduction
                    /* wallet: {
                        decrement: 20
                    }, */
                    totalRevenue: {
                        decrement: Number(order.totalPrice)
                    },
                    orderCount: {
                        decrement: 1
                    }

                }
            })

            // Add a transactio history
            // TODO: active when automation is on for payment
           /*  await db.walletTransaction.create({
                data: {
                    userId: order.resellerId,
                    amount: -20,
                    type: "AUTOMATION",
                    details: `রিটার্ন, চার্জ কর্তন হয়েছে। কাস্টমারের নাম: ${order.customerName}`,
                    walletBalance: (userWallet?.wallet as number) - 20
                }
            }) */
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


/* const handleCommission = async (resellerId: string, totalPrice: number) => {

    // Commission ranges based on price
    const commissionRanges = [
        { min: 2501, max: 10000, l1: 15, l2: 12, l3: 10, l4: 5 },
        { min: 1501, max: 2500, l1: 10, l2: 7, l3: 5, l4: 4 },
        { min: 1001, max: 1500, l1: 8, l2: 5, l3: 4, l4: 3 },
        { min: 801, max: 1000, l1: 7, l2: 4, l3: 3, l4: 2 },
        { min: 701, max: 800, l1: 6, l2: 4, l3: 3, l4: 2 },
        { min: 601, max: 700, l1: 6, l2: 4, l3: 2, l4: 2 },
        { min: 501, max: 600, l1: 6, l2: 3, l3: 2, l4: 2 },
        { min: 401, max: 500, l1: 5, l2: 2, l3: 2, l4: 2 },
        { min: 301, max: 400, l1: 4, l2: 2, l3: 2, l4: 2 },
        { min: 201, max: 300, l1: 3, l2: 2, l3: 2, l4: 2 },
        { min: 101, max: 200, l1: 2, l2: 2, l3: 2, l4: 2 },
        { min: 0, max: 100, l1: 1, l2: 1, l3: 1, l4: 1 }
    ];

    // Find the applicable commission range
    const commissionRange = commissionRanges.find(range =>
        totalPrice >= range.min && totalPrice <= range.max
    ) || commissionRanges[commissionRanges.length - 1]; // Default to lowest range if no match

    // find the reseller who made the sale
    const reseller = await db.user.findUnique({
        where: {
            id: resellerId
        },
        select: {
            referredBy: true,
            wallet: true
        }
    })

    // find the first level reseller
    if (reseller?.referredBy) {
        const l1Reseller = await db.user.findUnique({
            where: {
                referralCode: reseller.referredBy
            },
            select: {
                id: true,
                wallet: true,
                referredBy: true
            }
        })

        // Get L1 commission amount
        const l1Commission = commissionRange.l1;

        // add commission
        await db.user.update({
            where: {
                id: l1Reseller?.id
            },
            data: {
                wallet: {
                    increment: l1Commission
                }
            }
        })
        // add transaction history
        await db.walletTransaction.create({
            data: {
                userId: l1Reseller?.id as string,
                amount: l1Commission,
                type: "AUTOMATION",
                details: `রেফারেল কমিশন পেয়েছেন ${l1Commission} টাকা`,
                walletBalance: (l1Reseller?.wallet as number) + l1Commission
            }
        })

        // find the second level reseller
        if (l1Reseller?.referredBy) {
            const l2Reseller = await db.user.findUnique({
                where: {
                    referralCode: l1Reseller.referredBy
                },
                select: {
                    id: true,
                    wallet: true,
                    referredBy: true
                }
            })

            // Get L2 commission amount
            const l2Commission = commissionRange.l2;

            // add commission to l2 reseller
            await db.user.update({
                where: {
                    id: l2Reseller?.id
                },
                data: {
                    wallet: {
                        increment: l2Commission
                    }
                }
            })
            // add transaction history
            await db.walletTransaction.create({
                data: {
                    userId: l2Reseller?.id as string,
                    amount: l2Commission,
                    type: "AUTOMATION",
                    details: `রেফারেল কমিশন পেয়েছেন ${l2Commission} টাকা`,
                    walletBalance: (l2Reseller?.wallet as number) + l2Commission
                }
            })

            // find l3 referred user
            if (l2Reseller?.referredBy) {
                const l3Reseller = await db.user.findUnique({
                    where: {
                        referralCode: l2Reseller.referredBy
                    },
                    select: {
                        id: true,
                        wallet: true,
                        referredBy: true
                    }
                })

                // Get L3 commission amount
                const l3Commission = commissionRange.l3;

                // add commission to l3 reseller
                await db.user.update({
                    where: {
                        id: l3Reseller?.id
                    },
                    data: {
                        wallet: {
                            increment: l3Commission
                        }
                    }
                })

                // add transaction history
                await db.walletTransaction.create({
                    data: {
                        userId: l3Reseller?.id as string,
                        amount: l3Commission,
                        type: "AUTOMATION",
                        details: `রেফারেল কমিশন পেয়েছেন ${l3Commission} টাকা`,
                        walletBalance: (l3Reseller?.wallet as number) + l3Commission
                    }
                })

                // find l4 referred user
                if (l3Reseller?.referredBy) {
                    const l4Reseller = await db.user.findUnique({
                        where: {
                            referralCode: l3Reseller.referredBy
                        },
                        select: {
                            id: true,
                            wallet: true
                        }
                    })

                    // Get L4 commission amount
                    const l4Commission = commissionRange.l4;

                    // add commission to l4 reseller
                    await db.user.update({
                        where: {
                            id: l4Reseller?.id
                        },
                        data: {
                            wallet: {
                                increment: l4Commission
                            }
                        }
                    })

                    // add transaction history
                    await db.walletTransaction.create({
                        data: {
                            userId: l4Reseller?.id as string,
                            amount: l4Commission,
                            type: "AUTOMATION",
                            details: `রেফারেল কমিশন পেয়েছেন ${l4Commission} টাকা`,
                            walletBalance: (l4Reseller?.wallet as number) + l4Commission
                        }
                    })
                }
            }
        }
    }
} */