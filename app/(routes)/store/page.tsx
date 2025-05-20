import { auth } from '@/auth'
import React from 'react'

const HomePage = async () => {

    const session = await auth()
    const user = session?.user
    console.log(user)

    return (
        <div>HomePage</div>
    )
}

export default HomePage