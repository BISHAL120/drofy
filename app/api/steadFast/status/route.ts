import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const body = await req.json()
        const authHeader = req.headers.get('authorization')
        const token = authHeader?.split(' ')[1]
        console.log('Bearer Token:', token, authHeader, process.env.BEARER_TOKEN_TEST)

        if (token !== process.env.BEARER_TOKEN) {
            return NextResponse.json({ message: "Invalid Bearer Token." }, { status: 401 })
        }

        // console.log(body)

        /* 
        All Possible Types for delivery status
        1. pending
        2. delivered
        3. partial_delivered
        4. cancelled
        5. unknown
        */

        if (body.notification_type == "delivery_status") {
            if (body.status == "Delivered") {
                // add profit to customer waller
                // calculate delivery charge and add or minus from seller wallet
                // update order status to delivered
                // and update all necessary data

                await db.steadFastDeliveryStatus.create({
                    data: {
                        ...body
                    }
                })

                console.log("delevery Status Update")
                return NextResponse.json({ message: "Delivery Status Updated." }, { status: 200 })
            }

        } else if (body.notification_type == "tracking_update") {
            // Add the tracking update to the order document. add message, time of the notification, sender with data make an object and push it to order.trackingUpdates array or related fields.

            await db.steadFastDeliveryStatus.create({
                data: {
                    ...body
                }
            })


            console.log("Order Tracking Update")
            return NextResponse.json({ message: "Tracking Update Added." }, { status: 200 })
        } else {
            return NextResponse.json({ message: "Unable to process Webhook Data." }, { status: 400 })

        }


    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Failed to Process Webhook Data." },
            { status: 400 }
        )
    }
}