// import db from "@/lib/db";
import { auth } from "@/auth";
import db from "@/lib/db";
import { AddCartProps } from "@/lib/zustand/store";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();
        const { address, deliveryCharge, advanceCharge, comments, district, division, name, phone, upazila, union } = body.values;
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

        if (!division) {
            return NextResponse.json({ message: "Division is required." }, { status: 400 });
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

        // Get the order count
        const orderCount = await db.order.count();

        // Calculate total profit
        const totalProfit = cartItems.reduce((total: number, item: AddCartProps) => total + (item.sellPrice - item.price) * item.quantity, 0);

        const order = await db.order.create({
            data: {
                resellerId: user.id as string,
                orderCount: orderCount + 1,
                customerPhone: phone,
                customerName: name,
                customerDivision: division,
                customerDistrict: district,
                customerUpazila: upazila,
                customerUnion: union,
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

        const cartItemsCount = cartItems.reduce((total: number, item: AddCartProps) => total + item.quantity, 0);

        const getUser = await db.user.findUnique({
            where: {
                id: user.id as string,
            }
        })

        await db.user.update({
            where: {
                id: user.id as string,
            },
            data: {
                saleCount: getUser?.saleCount + cartItemsCount,
                totalRevenue: getUser?.totalRevenue + subtotal,
            }
        })


        return NextResponse.json({ data: order, message: "Order created successfully." }, { status: 201 });
    } catch (error) {
        console.log('[ORDERS_POST]', error);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}
