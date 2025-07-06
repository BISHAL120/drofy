// import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json();

        console.log(body)

        /* 
                if (!address) {
                    return new NextResponse("Address is required", { status: 400 });
                } */

        /*  const order = await db.order.create({
           data: {
             storeId,
             items,
             totalPrice,
             status: status || "PENDING",
             isPaid: isPaid || false,
             phone,
             address,
           }
         }); */

        return NextResponse.json({ data: "Result", message: "Order created successfully." }, { status: 201 });
    } catch (error) {
        console.log('[ORDERS_POST]', error);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}
