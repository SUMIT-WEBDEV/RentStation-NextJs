import React from 'react'
import Myads from '../_components/my-ads'
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'

const page = async () => {

    const user = await currentUser()

    console.log("user", user)
    const myAds = await db.products.findMany({
        where: {
            userId: user?.id
        }
    })

    console.log("myads", myAds)

    return (
        <div className='w-full'>
            <Myads myAds={myAds} />
        </div>
    )
}

export default page