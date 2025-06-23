import db from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req: Request) {
    try {
        // Get data from request body
        const body = await req.json();

        // Validate required fields
        if (!body.id) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }
        // Destructure id and isActive directly from body
        const { id: documentId, ...dataWithoutId } = body;

        console.log(body)

        // Update user active status with simplified logic
        const updatedUser = await db.user.update({
            where: { id: documentId },
            data: {
                ...dataWithoutId,
            },
            select: { isActive: true }
        });

        // Return success response
        return NextResponse.json(
            {
                message: "User status updated successfully",
                data: updatedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating user status:", error);
        return NextResponse.json(
            { message: "Error updating user status" },
            { status: 500 }
        );
    }
}
