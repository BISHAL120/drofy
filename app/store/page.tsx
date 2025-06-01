// import { auth } from '@/auth'
import { DashboardMenu } from '@/components/store/dashboardMenu'
import React from 'react'

const HomePage = async () => {

    /*     const session = await auth()
        const user = session?.user
        console.log(user) */

    return (
        <div className='h-full'>
            <DashboardMenu />
        </div>
    )
}

export default HomePage