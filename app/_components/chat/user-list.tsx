import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import userNullProfile from "@/app/assets/nullProfile.png"


export const UserList = memo(({ userData, handleInboxChat, dynamicSellerId, loading, searchChatText }: any) => {


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

    // if (error) {
    //     return <div>Something went wrong</div>;
    // }


    console.log("userData is", userData)

    return (
        <div>

            {userData && userData.conversations && userData.conversations.length > 0 ? (

                userData.conversations.filter((conversation: any) => {
                    const currentUserId = userData.id;
                    const member1 = conversation.members[0];
                    const member2 = conversation.members[1];
                    const otherMember = member1.id === currentUserId ? member2 : member1;
                    const userName = otherMember.name.toLowerCase(); // Convert name to lowercase for case-insensitive comparison
                    const searchText = searchChatText.toLowerCase(); // Convert search text to lowercase for case-insensitive comparison
                    return userName.includes(searchText) && conversation.messages.length > 0;
                })
                    .map((conversation: any, index: number) => {

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
                                        {userProfile ? (
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
                <div>No user found.</div>
            )}
        </div>
    );
});

UserList.displayName = 'UserList';





