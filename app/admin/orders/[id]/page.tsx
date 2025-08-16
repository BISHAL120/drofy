import OrderDetailsPage from '@/components/admin/orders/id/OrderDetails';
import OrderNotFound from '@/components/admin/orders/orderNotFound';
import InvalidIdError from '@/components/store/components/invalidIdError';
import { getOrderDetailsById } from '@/lib/data layer/admin/admin-DL';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if(!id) {
    return <OrderNotFound />
  }

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return (
      <InvalidIdError name="Order" link="/admin/orders" />
    );
  }


  const orderDetails = await getOrderDetailsById(id);

  if(!orderDetails) {
    return <OrderNotFound />
  }

  return (
    <div>
      <OrderDetailsPage order={orderDetails} />
    </div>
  )
}

export default Page