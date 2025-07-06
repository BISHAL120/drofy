import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const number = body.number

        const formData = new FormData()

        formData.append("phone", number)

        const response = await axios.post(
            "https://fraudchecker.link/api/v1/qc/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${process.env.FRAUD_CHECK_API}`,
                },
            }
        );
        const data = await response.data;

        console.log(data)
        // Return success response
        return NextResponse.json(
            { data: data, message: "Fraud check completed successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log("From Fraud Check POST :", error)
        // Return error response
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
