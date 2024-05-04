import React from 'react'
import ChatList from '../_components/chat/chat-list'
import { currentUserDetails } from '@/lib/auth';

async function page() {
    const user = await currentUserDetails();

    return (
        <ChatList user={user} />
    )
}

export const generateMetadata = async () => {

    return {
        title: "Connect Instantly with Renters - Chat Directly on Our Platform",
        description: "Have questions about a rental item or need to discuss details with the renter? Use our built-in chat feature to communicate securely and efficiently. Start chatting now!"
    }
}

export default page

