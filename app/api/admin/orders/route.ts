import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        // Validate request body here
        if (!body.id) {
            return NextResponse.json(
                { error: "Order ID is required" },
                { status: 400 }
            );
        }

        const { id, ...data } = body;

        // Update order in database
        const updatedOrder = await db.order.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json(
            { error: "Failed to update order" },
            { status: 500 }
        );
    }
}
