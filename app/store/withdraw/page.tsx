import { auth } from '@/auth'
import WithdrawPage from '@/components/store/withdraw/withdrawPage'
import React from 'react'

const Page = async () => {
    const session = await auth()
    const userId = session?.user.id
    return (
        <div>
            <WithdrawPage userId={userId!} />
        </div>
    )
}

export default Page