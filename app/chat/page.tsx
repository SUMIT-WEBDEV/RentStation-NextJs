import React from 'react'
import ChatList from '../_components/chat/chat-list'
import { currentUser, currentUserDetails } from '@/lib/auth';

async function page() {


    const user = await currentUserDetails();

    // console.log("user in chat page is", user)


    return (
        <div><ChatList user={user} /></div>
    )
}

export default page

