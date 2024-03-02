"use client"

import React, { memo, useEffect, useMemo, useState } from 'react'
import Chat from './chat'
import { useCurrentUser } from '@/hooks/use-current-user'
// import { getInboxUsers } from '@/actions/get-inbox-users'
import { createConversationId } from '@/actions/create-conversationId'
import { useRouter } from 'next/navigation'
import { useUserDetails } from '@/hooks/use-current-user-details'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import userNullProfile from "@/app/assets/nullProfile.png"
import { Skeleton } from '@/components/ui/skeleton'


interface IChatProps {
    conversationId: string,
    sellerId: string,
    sellerName: string
}

interface IInboxUsers {
    userId: string,
    userName: string
    userProfile: string
}



const ChatList = ({ conversationId, sellerId, sellerName }: IChatProps) => {
    const [receiverId, setReceiverId] = useState<string>("")
    // const [inboxUsers, setInboxUsers] = useState<any>([]);
    const Router = useRouter()
    const [dynamicConversationId, setDynamicConversationId] = useState<any>(conversationId)
    const [dynamicSellerId, setDynamicSellerId] = useState<any>(sellerId)
    const [dynamicSellerName, setDynamicSellerName] = useState<any>(sellerName)

    const user = useCurrentUser()

    const { userData, loading, error } = useUserDetails();

    // console.log("currentuser details is", userData)

    useEffect(() => {
        if (sellerId) {
            setReceiverId(sellerId)
        }
    }, [sellerId])

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

                window.history.pushState({}, '', `/settings/chat/new/${data.conversationId}/${selectedUser.id}`);
            }).catch(err => console.error(err))
        }
    }


    return (
        <div className="h-screen w-screen">
            <div className="flex flex-col h-[calc(100%-70px)]  md:flex-row mx-auto bg-gray-100 dark:bg-gray-900 max-w-5xl">

                <div className="w-full md:w-80 h-full dark:bg-gray-800 p-2">
                    <div className="h-full overflow-y-auto">
                        <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Inbox</div>
                        <div className="search-chat flex p-3">
                            <input className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md" type="text" placeholder="Search Messages" />
                            <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                                🔍
                            </div>
                        </div>
                        <div>

                            <UserList userData={userData} handleInboxChat={handleInboxChat} dynamicSellerId={dynamicSellerId} loading={loading} error={error} />
                        </div>
                    </div>
                </div>
                <div className="flex-grow h-full p-2 rounded-md">
                    <Chat conversationId={dynamicConversationId} sellerName={dynamicSellerName} receiverId={dynamicSellerId} />
                </div>
            </div>
        </div>
    )
}

export default ChatList


const UserList = memo(({ userData, handleInboxChat, dynamicSellerId, loading, error }: any) => {
    const [lazyLoadImages, setLazyLoadImages] = useState(false);

    useEffect(() => {
        // Enable lazy loading of images after component mounts
        setLazyLoadImages(true);
    }, []);

    if (loading) {
        return (
            <div className='m-4'>

                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <div className='flex space-x-3 items-center w-full mt-8' key={index}>
                            <div>
                                <Skeleton className='w-10 h-10 rounded-full' />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <Skeleton className='w-48 h-4 ' />
                                <Skeleton className='w-48 h-4' />
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    if (error) {
        return <div>Something went wrong</div>;
    }

    return (
        <div>
            {userData && userData.conversations && userData.conversations.length > 0 ? (
                userData.conversations.map((conversation: any, index: number) => {
                    const currentUserId = userData.id;
                    const member1 = conversation.members[0];
                    const member2 = conversation.members[1];
                    const otherMember = member1.id === currentUserId ? member2 : member1;
                    const userId = otherMember.id;
                    const userName = otherMember.name;
                    const userProfile = otherMember.image;
                    const lastMessage = conversation.messages[conversation.messages.length - 1];

                    if (lastMessage) {
                        return (
                            <div key={index} className={cn('m-4 p-2 cursor-pointer rounded-md flex space-x-3 items-center', userId === dynamicSellerId ? "bg-blue-400" : "bg-blue-200")} onClick={() => handleInboxChat(otherMember)}>
                                <div className=''>
                                    {userProfile && lazyLoadImages ? (
                                        <Image src={userProfile} width={40} height={40} alt="userImage" className='rounded-full' />
                                    ) : (
                                        <Image src={userNullProfile} width={40} height={40} alt="userImage" className='rounded-full' />
                                    )}
                                </div>
                                <div>
                                    <p>{userName}</p>
                                    <p className='text-sm text-gray-600'>{lastMessage.text}</p>
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })
            ) : (
                <div>No conversations found.</div>
            )}
        </div>
    );
});

UserList.displayName = 'UserList';