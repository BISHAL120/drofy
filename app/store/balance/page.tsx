import { auth } from '@/auth'
import BalanceStatement from '@/components/store/balance-statement/statement'
import { getBalanceStatementsById } from '@/lib/data layer/store/store-DL';
import React from 'react'

const Page = async () => {

    const session = await auth();
    const user = session?.user;

    const statements = await getBalanceStatementsById(user?.id || '');

    return (
        <div>
            <BalanceStatement statements={statements} />
        </div>
    )
}

export default Page