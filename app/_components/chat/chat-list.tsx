"use client"

import React, { memo, useEffect, useMemo, useState } from 'react'
import Chat from './chat'
import { createConversationId } from '@/actions/create-conversationId'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from 'lucide-react'
import { UserList } from './user-list'
import NoChat from './no-chat'


interface IChatProps {
    conversationId?: string,
    sellerId?: string,
    sellerName?: string
    user?: any
}

const ChatList = ({ conversationId, sellerId, sellerName, user }: IChatProps) => {
    // const [receiverId, setReceiverId] = useState<string>("")
    // const [inboxUsers, setInboxUsers] = useState<any>([]);
    const [dynamicConversationId, setDynamicConversationId] = useState<any>(conversationId)
    const [dynamicSellerId, setDynamicSellerId] = useState<any>(sellerId)
    const [dynamicSellerName, setDynamicSellerName] = useState<any>(sellerName)
    const [userLoading, setUserLoading] = useState(false)

    if (user === undefined) {
        setUserLoading(true)
    }

    const loading = false

    useEffect(() => {
        // Add overflow hidden to body on mount
        document.body.style.overflowY = 'hidden';

        // Remove overflow hidden from body on unmount
        return () => {
            document.body.style.overflowY = 'unset';
        };
    }, []);


    const handleInboxChat = (selectedUser: any) => {
        if (user) {
            createConversationId(user?.id, selectedUser.id).then((data) => {
                // console.log("data is conversationId-----", data);
                setDynamicConversationId(data.conversationId)
                setDynamicSellerName(selectedUser.name)
                setDynamicSellerId(selectedUser.id)

                window.history.pushState({}, '', `/chat/new/${data.conversationId}/${selectedUser.id}`);
            }).catch(err => console.error(err))
        }
    }

    const [searchChatText, setSearchChatText] = useState<string>("")


    return (
        <div className="h-screen w-screen ">
            {/* <div className="flex flex-col h-[calc(100%-70px)]  md:flex-row mx-auto bg-gray-100 dark:bg-gray-900 max-w-5xl"> */}
            <div className="flex flex-col h-[calc(100%-100px)] border border-gray-200 md:flex-row mx-auto bg-gray-100 dark:bg-gray-900 max-w-5xl">

                <div className="w-full md:w-80 h-full dark:bg-gray-800 p-2 border border-gray-200">
                    <div className="h-full">

                        <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Inbox</div>
                        <div className="search-chat flex p-3" >
                            <input className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md" type="text" placeholder="Search Messages" onChange={(e) => setSearchChatText(e.target.value)} value={searchChatText} />
                            <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                                <Search />
                            </div>
                        </div>

                        <UserList userData={user} handleInboxChat={handleInboxChat} dynamicSellerId={dynamicSellerId} loading={userLoading} searchChatText={searchChatText} />

                    </div>
                </div>

                <div className="flex-grow h-full p-2 lg:rounded-md">
                    {
                        dynamicConversationId &&
                        <Chat conversationId={dynamicConversationId} sellerName={dynamicSellerName} receiverId={dynamicSellerId} />
                    }

                    {!dynamicConversationId &&
                        <div className='lg:block hidden h-full'>
                            <NoChat />
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default ChatList

