import React from 'react'
import Myads from '../_components/my-ads'
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'

const page = async () => {

    const user = await currentUser()

    // console.log("user", user)
    const myAds = await db.products.findMany({
        where: {
            userId: user?.id
        }
    })

    const favorites = await db.favorite.findMany({
        where: { userId: user?.id },
        include: {
            product: true
        },
    })

    console.log("my favorites", favorites)

    return (
        <div className='w-full'>
            <Myads myAds={myAds} favorites={favorites} />
        </div>
    )
}

export default page