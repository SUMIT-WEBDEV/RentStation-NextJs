import React from 'react'
import image from "../../assets/SelectChatLogo.png"
import Image from 'next/image'


const NoChat = () => {
    return (
        <div className='w-full h-5/6 flex flex-col justify-center items-center'>
            <Image
                src={image}
                alt=""
                height={150}
                width={150}
            />
            <div className="hello__Text">Select a Chat to View Conversation</div>
        </div>
    )
}

export default NoChat