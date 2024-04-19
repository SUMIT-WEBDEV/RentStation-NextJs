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

export const generateMetadata = async () => {

    return {
        title: "Manage Ads and Wishlist - Your Hub for Rental Listings and Saved Items",
        description: "Manage your ads and wishlist effortlessly. List items for rent or save them for later with ease. Start organizing today!"
    }
}


export default page