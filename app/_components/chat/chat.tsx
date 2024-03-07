"use client"

import { getMessages, postMessage } from '@/actions/post-message'
import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
// import img from 'next/img'
import React, { useEffect, useRef, useState, useMemo, memo } from 'react'
import { io } from "socket.io-client";
import { SendHorizontal, Smile } from 'lucide-react';
import Image from 'next/image'




interface IChat {
    conversationId: string,
    receiverId: string,
    sellerName: string,
}

const Chat = ({ conversationId, sellerName, receiverId }: IChat) => {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<any>([]);
    const user = useCurrentUser()
    const socket = useRef<any>();

    const [toggleChat, setToggleChat] = useState(false)

    useEffect(() => {
        if (receiverId) {
            setToggleChat(true)
        }
    }, [receiverId])

    const handleCloseChat = () => {
        setToggleChat(false)
    }


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data: any) => {
            console.log("getMessageData is", data)
            const modifiedData = {
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            }
            setMessages((prevMessages: any) => [...prevMessages, modifiedData]);
        });
        return () => {
            socket.current.disconnect();
        };
    }, []);


    const handleMessage = async () => {
        if (user) {
            try {
                const payload = {
                    text: message,
                    senderId: user.id,
                    conversationId: conversationId
                };

                const data = await postMessage(payload);
                setMessages([...messages, data]);
                setMessage('');

                await socket.current.emit("sendMessage", {
                    senderId: user?.id,
                    receiverId,
                    text: message,
                });
            } catch (error) {
                console.error("Error handling message:", error);
            }
        }
    };


    useEffect(() => {
        getMessages({ conversationId })
            .then((data) => setMessages(data))
            .catch((err) => console.log(err));
        socket.current.emit("addUser", user?.id);
        socket.current.on("getUsers", (users: any) => {
            // console.log("users", users);
        });
    }, [user, conversationId]);


    return (

        // <div className="h-full flex flex-col lg:static lg:w-auto fixed w-full right-0 top-0">
        <div className={`h-full flex flex-col lg:static lg:w-auto fixed w-full right-0 top-0 transform translate-x-0 transition-transform duration-200 ease-in-out ${toggleChat ? "-translate-x-0" : "translate-x-full"}`}>
            <div className="w-full h-15 p-1 bg-purple-600 dark:bg-gray-800 shadow-md lg:rounded-xl rounded-bl-none rounded-br-none">
                <div className="flex p-2 align-middle items-center">


                    <div className="p-2 md:hidden rounded-full mr-1 hover:bg-purple-500 text-white" onClick={handleCloseChat} >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </div>


                    <div className="border rounded-full border-white p-1/2">
                        <Image className="w-14 h-14 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" width={50} height={50} />
                    </div>
                    <div className="flex-grow p-2">
                        <div className="text-md text-gray-50 font-semibold">{sellerName}</div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                            <div className="text-xs text-gray-50 ml-1">
                                Online
                            </div>
                        </div>
                    </div>
                    <div className="p-2 text-white cursor-pointer hover:bg-purple-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className='overflow-y-auto flex-grow bg-gray-100'>

                {
                    messages && messages?.map((msg: any, index: number) => (

                        // <div className="w-full flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">
                        <div className="w-full  dark:bg-gray-900 " key={index} >
                            <div className="flex items-end w-3/4">
                                <Image className="hidden w-8 h-8 m-3 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" width={50} height={50} />
                                <div className="w-8 m-3 rounded-full" />
                            </div>
                            {user?.id != msg.senderId ? (
                                <div className="flex items-end w-3/4">

                                    <Image className="w-8 h-8 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" width={50} height={50} />
                                    <div className="p-3 bg-purple-300 dark:bg-gray-800 mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
                                        <p className="text-gray-700 dark:text-gray-200">
                                            {msg.text}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            1 day ago
                                        </p>
                                    </div>

                                </div>
                            ) : (
                                <div className="flex justify-end">
                                    <div className="flex items-end w-auto bg-purple-500 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
                                        <div className="p-2">
                                            <div className="text-gray-200">
                                                {msg.text}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>

            <div className="h-15  p-1 rounded-xl rounded-tr-none rounded-tl-none dark:bg-gray-800 lg:static fixed bottom-16 w-full">
                <div className="flex items-center">
                    <div className="p-2 text-gray-600 dark:text-gray-200 ">
                        <Smile />
                    </div>
                    <div className="search-chat flex flex-grow p-2">
                        <input className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md" type="text" placeholder="Type your message ..." value={message} onChange={(e) => setMessage(e.target.value)}

                        />
                        <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md" onClick={handleMessage}>
                            <SendHorizontal />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default memo(Chat)





// "use client"


// import { getConversationMembers } from '@/actions/get-conversation'
// import { getMessages, postMessage } from '@/actions/post-message'
// import { Button } from '@/components/ui/button'
// import { useCurrentUser } from '@/hooks/use-current-user'
// import React, { useEffect, useRef, useState, useMemo } from 'react'
// import { io } from "socket.io-client";

// const Chat = ({ conversationId }: any) => {
//     const [message, setMessage] = useState("")
//     const [messages, setMessages] = useState<any>([]);
//     const user = useCurrentUser()
//     const [receiverId, setReceiverId] = useState<string | null>(null);
//     const socket = useRef<any>();

//     console.log("conversationId", conversationId)

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
//         return () => {
//             socket.current.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         getConversationMembers(conversationId)
//             .then((data) => {
//                 const memberId = data.find((member: any) => member.id !== user?.id);
//                 if (memberId) {
//                     setReceiverId(memberId.id);
//                 } else {
//                     console.log("Receiver not found");
//                 }
//             })
//             .catch((err) => console.log(err))
//     }, [conversationId, user]);

//     console.log("receiver id is", receiverId)

//     const handleMessage = async () => {
//         if (user) {
//             try {
//                 const payload = {
//                     text: message,
//                     senderId: user.id,
//                     conversationId: conversationId
//                 };

//                 const data = await postMessage(payload);
//                 setMessages([...messages, data]);
//                 setMessage('');

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
//         getMessages({ conversationId })
//             .then((data) => setMessages(data))
//             .catch((err) => console.log(err));
//         socket.current.emit("addUser", user?.id);
//         socket.current.on("getUsers", (users: any) => {
//             console.log("users", users);
//         });
//     }, [user, conversationId]);

//     return (
//         <div>
//             Start a chat
//             <h1>conversation Id {conversationId}</h1>
//             <h1>current userId/senderId {user?.id}</h1>
//             <div className='m-5'>
//                 {messages.length !== 0 ? messages.map((msg: any, index: number) => (
//                     <h1 key={index}>{msg.text}</h1>
//                 )) :
//                     <h1>loading......</h1>
//                 }
//             </div>
// <input
//     value={message}
//     placeholder='write a message'
//     onChange={(e) => setMessage(e.target.value)}
// />
// <Button onClick={handleMessage}>Send message</Button>
//         </div>
//     )
// }

// export default React.memo(Chat);


// import React from 'react'
// // import Conversation from './Conversation';
// // import Messages from './Messages';

// const Chat = () => {
//     return (
//         <div className="">
//             <div className="flex bg-white dark:bg-gray-900">

//                 <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
//                     <div className="h-full overflow-y-auto">
//                         <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Inbox</div>
//                         <div className="search-chat flex p-3">
//                             <input className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md" type="text" placeholder="Search Messages" />
//                             <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                 </svg>
//                             </div>
//                         </div>
//                         <div className="text-lg font-semibol text-gray-600 dark:text-gray-200 p-3">Recent</div>
//                         {/* <Conversation/> */}
//                     </div>
//                 </div>
//                 <div className="flex-grow  h-screen p-2 rounded-md">
//                     {/* <Messages/> */}
//                     <div className="flex-grow h-full flex flex-col">
//                         <div className="w-full h-15 p-1 bg-purple-600 dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
//                             <div className="flex p-2 align-middle items-center">
//                                 <div className="p-2 md:hidden rounded-full mr-1 hover:bg-purple-500 text-white">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                                     </svg>
//                                 </div>
//                                 <div className="border rounded-full border-white p-1/2">
//                                     <img className="w-14 h-14 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" />
//                                 </div>
//                                 <div className="flex-grow p-2">
//                                     <div className="text-md text-gray-50 font-semibold">Rey Jhon A. Baquirin </div>
//                                     <div className="flex items-center">
//                                         <div className="w-2 h-2 bg-green-300 rounded-full"></div>
//                                         <div className="text-xs text-gray-50 ml-1">
//                                             Online
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="p-2 text-white cursor-pointer hover:bg-purple-500 rounded-full">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="w-full flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">
//                             <div className="flex items-end w-3/4" >
//                                 <img className="hidden w-8 h-8 m-3 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" />
//                                 <div className="w-8 m-3 rounded-full" />
//                                 <div className="p-3 bg-purple-300 dark:bg-gray-800 mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
//                                     <div className="text-xs text-gray-600 dark:text-gray-200">
//                                         Rey Jhon A. Baqurin
//                                     </div>
//                                     <div className="text-gray-700 dark:text-gray-200">
//                                         gsegjsghjbdg bfb sbjbfsj fsksnf jsnfj snf nnfnsnfsnj
//                                     </div>
//                                     <div className="text-xs text-gray-400">
//                                         1 day ago
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex items-end w-3/4">
//                                 <img className="w-8 h-8 m-3 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" />
//                                 <div className="p-3 bg-purple-300 dark:bg-gray-800  mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
//                                     <div className="text-xs text-gray-100 hidden dark:text-gray-200">
//                                         Rey Jhon A. Baqurin
//                                     </div>
//                                     <div className="text-gray-700 dark:text-gray-200">
//                                         gsegjsghjbdg bfb sbjbfsj fsksnf jsnfj snf nnfnsnfsnj
//                                     </div>
//                                     <div className="text-xs text-gray-400">
//                                         1 day ago
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex justify-end">
//                                 <div className="flex items-end w-auto bg-purple-500 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
//                                     <div className="p-2">
//                                         <div className="text-gray-200">
//                                             Hello ? How Can i help you ?
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex justify-end">
//                                 <div className="flex items-end w-3/4 bg-purple-500 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
//                                     <div className="p-2">
//                                         <div className="text-gray-200">
//                                             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex justify-end">
//                                 <div className="flex items-end w-3/4 bg-purple-500 dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 max-w-xl md:w-auto">
//                                     <div className="p-2">
//                                         <div className="text-gray-200 ">
//                                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex items-end w-3/4">
//                                 <img className="w-8 h-8 m-3 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" />
//                                 <div className="p-3 bg-purple-300 dark:bg-gray-800 mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
//                                     <div className="text-xs text-gray-100 hidden dark:text-gray-200">
//                                         Rey Jhon A. Baqurin
//                                     </div>
//                                     <div className="text-gray-700 dark:text-gray-200">
//                                         Hello po ang pogi niyo :)
//                                     </div>
//                                     <div className="text-xs text-gray-400">
//                                         just now
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="h-15  p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
//                             <div className="flex items-center">
//                                 <div className="p-2 text-gray-600 dark:text-gray-200 ">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                     </svg>
//                                 </div>
//                                 <div className="search-chat flex flex-grow p-2">
//                                     <input className="input text-gray-700 dark:text-gray-200 text-sm p-5 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md" type="text" placeholder="Type your message ..." />
//                                     <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Chat