import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log(body)
        return NextResponse.json({ message: "Successfully created SteadFast order", data: body }, { status: 201 })
    } catch (error) {
        console.log("Error from SteadFast create order POST:", error)
        return NextResponse.json({ message: "Failed to create SteadFast order" }, { status: 500 })
    }
}