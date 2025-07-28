import OrderDetailsPage from "@/components/admin/orders/id/OrderDetails";
import OrderNotFound from "@/components/admin/orders/orderNotFound";
import { Button } from "@/components/ui/button";
import { getOrderDetailsById } from "@/lib/data layer/admin/admin-DL";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!id) {
    return <OrderNotFound />;
  }

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Invalid Order ID
          </h2>
          <p className="text-gray-500 mb-6">
            The provided order ID is not valid
          </p>
          <Button
            asChild
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Link href="/admin/orders">Back To Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  const orderDetails = await getOrderDetailsById(id);

  if (!orderDetails) {
    return <OrderNotFound />;
  }

  return (
    <div>
      <OrderDetailsPage order={orderDetails} />
    </div>
  );
};

export default Page;
