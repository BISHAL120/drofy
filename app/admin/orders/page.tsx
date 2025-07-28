import OrdersPage from "@/components/admin/orders/orders";
import { getAllOrders } from "@/lib/data layer/admin/admin-DL";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const search = params.search || "";
  const status = params.status || "";
  const payment = params.payment || "";

  console.log(search, status);

  const orders = await getAllOrders({ search, status, payment });

  return (
    <div>
      <OrdersPage orders={orders} />
    </div>
  );
};

export default Page;
