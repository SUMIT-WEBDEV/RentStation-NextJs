// "use client"

// import { getConversationMembers } from '@/actions/get-conversation'
// import { getMessages, postMessage } from '@/actions/post-message'
// import { Button } from '@/components/ui/button'
// import { useCurrentUser } from '@/hooks/use-current-user'
// import React, { useEffect, useRef, useState } from 'react'
// import { io } from "socket.io-client";


// const Chat = ({ conversationId }: any) => {
//     const [message, setMessage] = useState("")
//     const [messages, setMessages] = useState<any>([]);
//     const user = useCurrentUser()
//     const [receiverId, setReceiverId] = useState<string | null>(null);
//     const [arrivalMessage, setArrivalMessage] = useState(null);
//     const socket = useRef<any>();



//     useEffect(() => {
//         socket.current = io("ws://localhost:8900");
//         socket.current.on("getMessage", (data: any) => {

//             console.log("getMessageData is", data)
//             const modifiedData = {
//                 senderId: data.senderId,
//                 text: data.text,
//                 createdAt: Date.now(),
//             }

//             setMessages((prevMessages: any) => [...prevMessages, modifiedData]);
//         });
//     }, []);


//     useEffect(() => {
//         getConversationMembers(conversationId).then((data) => {
//             const memberId = data.find((member: any) => member.id !== user?.id);
//             if (memberId) {
//                 setReceiverId(memberId.id);
//             } else {
//                 console.log("Receiver not found");
//             }
//         }).catch((err) => console.log(err))
//     }, [conversationId])

//     console.log("reciever id is", receiverId)


//     const handleMessage = async () => {
//         if (user) {
//             try {
//                 const payload = {
//                     text: message,
//                     senderId: user.id,
//                     conversationId: conversationId
//                 };

//                 // Post the message
//                 const data = await postMessage(payload);

//                 // Update the messages state with the new message
//                 setMessages([...messages, data]);

//                 // Clear the message input field
//                 setMessage('');

//                 // Emit the message to the WebSocket server
//                 await socket.current.emit("sendMessage", {
//                     senderId: user?.id,
//                     receiverId,
//                     text: message,
//                 });
//             } catch (error) {
//                 console.error("Error handling message:", error);
//             }
//         }
//     };


//     useEffect(() => {
//         const payload = {
//             conversationId: conversationId
//         }

//         getMessages(payload)
//             .then((data) => setMessages(data))
//             .catch((err) => console.log(err));

//         socket.current.emit("addUser", user?.id);
//         socket.current.on("getUsers", (users: any) => {

//             console.log("users", users);
//         });
//     }, [user, conversationId]);




//     useEffect(() => {
//         // Fetch messages from server when component mounts or conversation ID changes
//         const payload = {
//             conversationId: conversationId,
//         };
//         getMessages(payload)
//             .then((data) => setMessages(data))
//             .catch((err) => console.log(err));
//     }, [user, conversationId]);




//     // console.log("messages", messages)


//     return (
//         <div>

//             Start a chat
//             <h1>conveersation Id{conversationId}</h1>
//             <h1>current userId/senderId{user?.id}</h1>
//             {/* <h1>{message}</h1> */}

//             <div className='m-5'>

//                 {messages.length != 0 ? messages.map((msg: any, index: number) => (
//                     <h1 key={index}>{msg.text}</h1>
//                 )) :
//                     <h1>loading......</h1>
//                 }


//             </div>

//             <input
//                 value={message}
//                 placeholder='write a message'
//                 onChange={(e) => setMessage(e.target.value)}
//             />

//             <Button onClick={handleMessage}>Send message</Button>

//         </div>
//     )
// }

// export default Chat


import React from 'react'

function chat() {
    return (
        <div>chat</div>
    )
}

export default chat