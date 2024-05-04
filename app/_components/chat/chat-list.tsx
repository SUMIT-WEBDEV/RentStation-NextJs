"use client"

import Chat from './chat'
import { Search } from 'lucide-react'
import { UserList } from './user-list'
import NoChat from './no-chat'
import { useConversation } from '@/hooks/use-conversation'

interface IChatProps {
    conversationId?: string,
    sellerId?: string,
    sellerName?: string
    user?: any
}

const ChatList = ({ conversationId, sellerId, sellerName, user }: IChatProps) => {

    const {
        dynamicConversationId,
        dynamicSellerId,
        dynamicSellerName,
        userLoading,
        searchChatText,
        setSearchChatText,
        handleInboxChat
    } = useConversation({ conversationId, sellerId, sellerName, user });


    return (
        <div className="h-[600px] m-8">
            <div className="flex flex-col h-full border border-gray-200 md:flex-row mx-auto bg-gray-100 dark:bg-gray-900 max-w-5xl ">

                <div className="w-full md:w-80 h-full dark:bg-gray-800 p-2 border border-gray-200">

                    <div className='h-full flex flex-col'>
                        <div className='flex-[20%] '>
                            <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Inbox</div>
                            <div className="search-chat flex p-3" >
                                <input className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md" type="text" placeholder="Search Messages" onChange={(e) => setSearchChatText(e.target.value)} value={searchChatText} />
                                <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                                    <Search />
                                </div>
                            </div>
                        </div>
                        <div className='flex-[80%] overflow-y-scroll'>
                            <UserList userData={user} handleInboxChat={handleInboxChat} dynamicSellerId={dynamicSellerId} loading={userLoading} searchChatText={searchChatText} />
                        </div>
                    </div>

                </div>

                <div className="flex-grow  p-2 lg:rounded-md">
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

