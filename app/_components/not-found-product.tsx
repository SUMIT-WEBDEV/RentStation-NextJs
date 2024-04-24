import React from 'react'
import NotFoundImage from "/public/notFound.png"
import Image from 'next/image'

const NotFound = () => {
    return (
        <div className="h-[60vh] flex items-center justify-center">
            <div>
                <Image src={NotFoundImage} width={350} height={350} alt="" />
                <h2 className="text-center tracking-wide font-semibold text-lg text-#242424">No Products found matches this search!</h2>
            </div>
        </div>
    )
}

export default NotFound