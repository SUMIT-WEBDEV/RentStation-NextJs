
import React from 'react'
import Chat from '@/app/_components/chat/chat'
import ChatList from '@/app/_components/chat/chat-list'
import { db } from '@/lib/db'
import { useCurrentUser } from '@/hooks/use-current-user'
import { currentUserDetails } from '@/lib/auth'

const page = async ({ params }: any) => {

    const sellerData = await db.user.findUnique({
        where: {
            id: params.sellerId
        }
    })


    const conversationId = params.conversationId
    const sellerName = sellerData?.name || "";

    const user = await currentUserDetails();



    // console.log("sellerData", sellerData)
    // console.log("params are", params)
    // console.log("conversationId are", params.conversationId)

    return (
        <div className='overflow-y-hidden min-h-screen'>
            <ChatList conversationId={conversationId} sellerId={params.sellerId} sellerName={sellerName} user={user} />
        </div>
    )
}

export default page