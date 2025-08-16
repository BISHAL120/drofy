import db from "@/lib/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId } = body;
    console.log(orderId);

    // Find The Order Details
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        customerName: true,
        customerPhone: true,
        customerAddress: true,
        customerDistrict: true,
        customerUpazila: true,
        totalPrice: true,
        deliveryCharge: true,
        advanceCharge: true,
        comments: true,
      }
    });

    const formatAddress = `${order?.customerDistrict}, ${order?.customerUpazila}, ${order?.customerAddress}`

    const codAmount = order?.advanceCharge
      ? Number(order.totalPrice)
      : Number(order?.deliveryCharge) + Number(order?.totalPrice);

    const FormatData = {
      invoice: order?.id,
      recipient_name: order?.customerName,
      recipient_phone: order?.customerPhone,
      recipient_address: formatAddress,
      cod_amount: codAmount,
      note: order?.comments,
      delivery_type: 0
    }

    // Create the order on SteadFast
    axios.post(`${process.env.STEADFAST_BASE_URL}/create_order`, FormatData, {
      headers: {
        "Api-Key": `${process.env.STEADFAST_API_KEY}`,
        "Secret-Key": `${process.env.STEADFAST_API_SECRET}`,
        "Content-Type": "application/json",
      }
    }).then(async (res) => {
      if (res.data.status === 200) {
        await db.order.update({
          where: {
            id: orderId,
          },
          data: {
            consignment_id: res.data.consignment.consignment_id,
            tracking_code: res.data.consignment.tracking_code,
            status: "PROCESSING"
          }
        })
      }
    }).catch((err) => {
      console.log(err);
    });

    return NextResponse.json(
      { message: "Courier Assigned Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error from SteadFast create order POST:", error);
    return NextResponse.json(
      { message: "Failed to create SteadFast order" },
      { status: 500 }
    );
  }
}
