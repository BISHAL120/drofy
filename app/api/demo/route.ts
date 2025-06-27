import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Return success response
        return NextResponse.json(
            { message: 'Demo POST request successful', data: body },
            { status: 200 }
        )
    } catch (error) {
        // Return error response
        return NextResponse.json(
            { message: 'Error processing demo POST request', error: error },
            { status: 500 }
        )
    }
}
