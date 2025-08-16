import { auth } from '@/auth';
import ActiveOrders from '@/components/store/active-orders/active-orders'
import { getOrersHistoryById } from '@/lib/data layer/store/store-DL';
import React from 'react'

const Page = async () => {

    const session = await auth();
    const user = session?.user;

    if(!user) {
        return null;
    }

    const orders = await getOrersHistoryById(user?.id || ''); 

    return (
        <div>
            <ActiveOrders activeOrders={orders} />
        </div>
    )
}

export default Page