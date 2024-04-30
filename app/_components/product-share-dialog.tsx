"use client"

import React from 'react'
import { CopyAll, CopyAllOutlined, Email, FacebookOutlined, Twitter, WhatsApp } from "@mui/icons-material";
import { TwitterShareButton, FacebookShareButton, WhatsappShareButton, EmailShareButton } from "react-share"
import { Button } from "@/components/ui/button";


interface dialogShareProps {
    setCopy: (value: boolean) => void
    productTitle: string
    copy: boolean
}


const ProductShareDialog = ({ setCopy, productTitle, copy }: dialogShareProps) => {

    const productUrl = window.location.href

    const onCopyLink = () => {
        navigator.clipboard
            .writeText(productUrl)
            .then(() => setCopy(true))
    }

    return (
        <div className="bg-white lg:p-10 px-5 py-8 space-y-5 text-center float-right rounded-md m-3">
            <div className="flex items-center justify-center">
                <input value={productUrl} className="text-sm outline-none p-1 border border-black rounded-sm m-1 w-full" /><Button size="sm" onClick={onCopyLink} ><CopyAll fontSize="small" />
                    {copy ? "Copied" : "Copy Link"}
                </Button>
            </div>
            <div className="justify-center flex items-center gap-5">
                <FacebookShareButton url={productUrl} title={productTitle}>
                    <FacebookOutlined className="cursor-pointer text-blue-500" fontSize="large" />

                </FacebookShareButton>
                <WhatsappShareButton url={productUrl} title={productTitle}>
                    <WhatsApp className="cursor-pointer text-green-400" fontSize="large" />
                </WhatsappShareButton>

                <TwitterShareButton url={productUrl} title={productTitle} >
                    <Twitter className="cursor-pointer text-blue-600" fontSize="large" />
                </TwitterShareButton>

                <EmailShareButton url={productUrl} title={productTitle} >
                    <Email className="cursor-pointer text-[#24242]" fontSize="large" />
                </EmailShareButton>

            </div>
        </div>
    )
}

export default ProductShareDialog