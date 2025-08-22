import db from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {

        const body = await request.json()
        const { id } = body

        if (!id) {
            return NextResponse.json(
                { message: "Withdrawal ID is required" },
                { status: 400 }
            );
        }

        /* Find and update the withdrawal request status */
        await db.withdrawalRequest.update({
            where: {
                id: id
            },
            data: {
                status: "REJECTED",
                processedDate: new Date()
            }
        })
        return NextResponse.json(
            { message: "Withdrawal Rejected" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error rejecting withdrawal:", error);
        return NextResponse.json(
            { error: "Failed to reject withdrawal" },
            { status: 500 }
        );
    }
}
