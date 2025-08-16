// import db from "@/lib/db";
import { auth } from "@/auth";
import db from "@/lib/db";
import { AddCartProps } from "@/lib/zustand/store";
import { VariantType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();
        const { address, deliveryCharge, advanceCharge, comments, district, name, phone, upazila } = body.values;
        const { cartItems, subtotal } = body;

        const session = await auth();
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 400 });
        }

        if (!name) {
            return NextResponse.json({ message: "Name is required." }, { status: 400 });
        }

        if (!phone) {
            return NextResponse.json({ message: "Phone number is required." }, { status: 400 });
        }

        if (!address) {
            return NextResponse.json({ message: "Address is required." }, { status: 400 });
        }

        if (!district) {
            return NextResponse.json({ message: "District is required." }, { status: 400 });
        }

        if (!upazila) {
            return NextResponse.json({ message: "Upazila is required." }, { status: 400 });
        }

        if (!deliveryCharge) {
            return NextResponse.json({ message: "Delivery charge is required." }, { status: 400 });
        }

        // find the reseller data
        const getUser = await db.user.findUnique({
            where: {
                id: user.id as string,
            },
            select: {
                orderCount: true,
                wallet: true,
                totalRevenue: true,
            }
        })
        if (!getUser) return NextResponse.json({ message: "User not found." }, { status: 400 });

        // check wallet balance
        if (getUser?.wallet < deliveryCharge) {
            if(getUser.wallet < 0) {
                return NextResponse.json({ message: "মাইনাস ব্যালেন্স পরিশোধ করুন!" }, { status: 400 });
            }
            return NextResponse.json({ message: "পর্যাপ্ত ব্যালেন্স নাই!" }, { status: 400 });
        }

        // deduct courier charge from wallet
        await db.user.update({
            where: {
                id: user.id as string,
            },
            data: {
                wallet: getUser?.wallet - deliveryCharge,
            }
        })

        // Update Transaction History
        await db.walletTransaction.create({
            data: {
                userId: user.id as string,
                amount: -deliveryCharge,
                type: "AUTOMATION",
                walletBalance: getUser?.wallet - deliveryCharge,
                details: `${getUser.orderCount + 1} নং অর্ডার টির ডেলিভারি চার্জ আপনার ব্যালেন্স থেকে পেমেন্ট করেছেন ${deliveryCharge} টাকা।`
            }
        })

        // Get the order count
        const orderCount = await db.order.count();

        // Calculate total profit
        const totalProfit = cartItems.reduce((total: number, item: AddCartProps) => total + (item.sellPrice - item.price) * item.quantity, 0);

        // Create the order
        const order = await db.order.create({
            data: {
                resellerId: user.id as string,
                orderNumber: orderCount + 1,
                customerPhone: phone,
                customerName: name,
                customerDistrict: district,
                customerUpazila: upazila,
                customerAddress: address,
                deliveryCharge: deliveryCharge,
                advanceCharge: advanceCharge == "yes" ? true : false,
                totalPrice: String(subtotal),
                comments: comments,
                cartItems: {
                    create: cartItems.map((item: AddCartProps) => ({
                        productId: item.id,
                        productName: item.name,
                        productPrice: String(item.price),
                        sellingPrice: String(item.sellPrice),
                        profit: String(item.sellPrice - item.price),
                        productImage: item.image,
                        productQuantity: String(item.quantity),
                        productSize: item.size,
                        productSubcategory: item.subCategory,
                    })),
                },
                chargeStatus: advanceCharge == "yes" ? "PREPAID" : "COD",
                totalProfit
            },
            include: {
                cartItems: true,
            }
        })


        // Reduce the stock quantity
        await Promise.all(cartItems.map(async (item: AddCartProps) => {
            await db.product.update({
                where: {
                    id: item.id,
                },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                    variant: {
                        updateMany: {
                            where: {
                                variantType: item.size as VariantType
                            },
                            data: {
                                stock: {
                                    decrement: item.quantity
                                }
                            }
                        }
                    }

                }
            })
        }))


        // Update the user order count and total revenue
        await db.user.update({
            where: {
                id: user.id as string,
            },
            data: {
                orderCount: getUser?.orderCount + 1,
                totalRevenue: getUser?.totalRevenue + subtotal,
            }
        })

        return NextResponse.json({ data: order, message: "Order created successfully.", id: order.id }, { status: 201 });
    } catch (error) {
        console.log('ORDERS_POST :', error);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}
