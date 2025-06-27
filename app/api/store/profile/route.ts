import db from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req: Request) {
    try {
        const { id, name, phone, email, district, address, companyName } = await req.json();

        if (!id) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        const updatedUser = await db.user.update({
            where: {
                id: id,
            },
            data: {
                name,
                phone,
                companyName,
                email,
                district,
                address,
            },
        });

        return NextResponse.json({ data: updatedUser, message: "Profile updated successfully" }, { status: 200 });

    } catch (error) {
        console.log("Error updating user profile:", error);
        return NextResponse.json(
            { message: "Failed to update user profile" },
            { status: 500 }
        );
    }
}
