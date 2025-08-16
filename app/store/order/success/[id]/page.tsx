import OrderSuccessPage from "@/components/store/order/success/orderSuccess";
import { getOrderDataById } from "@/lib/data layer/store/store-DL";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Get Order Data
  const orderData = await getOrderDataById(id);
  console.log(orderData)
  return (
    <div>
      <OrderSuccessPage data={orderData} />
    </div>
  );
};

export default Page;
