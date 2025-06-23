import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        // Get the request body
        const body = await request.json()
        console.log(body)

        // Process the request
        // Add your business logic here

        // Return success response
        return NextResponse.json(
            { message: 'Success' },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
