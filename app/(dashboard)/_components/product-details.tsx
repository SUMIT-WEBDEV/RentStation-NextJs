"use client"

import Image from "next/image";
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { createConversationId } from "@/actions/create-conversationId";


interface Products {
    id: string;
    location: string;
    price: string;
    description: string;
    title: string;
    duration: string;
    category: string;
    image: string | null;
    userId: string;
    createdAt: Date;
}

interface ProductDetailsProps {
    product: Products | null;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const user = useCurrentUser()
    console.log("user is", user)
    const Router = useRouter()


    const handleChat = (id: string) => {
        createConversationId(user?.id, id).then((data) => {
            // console.log("data is conversationId-----", data);
            Router.push(`/settings/chat/new/${data.conversationId}`)
        }).catch(err => console.error(err))
    }


    return (
        <div>
            {product ? (
                <div className="flex w-screen p-8">

                    {product.image ? (
                        <div className="flex flex-[60%] justify-center items-center w-full border-2 border-gray-50">
                            {/* <Carousel>
                                <CarouselContent>
                                    <CarouselItem>
                                        <Image src={product.image} alt={product.title} width={500} height={200} />

                                    </CarouselItem>
                                    <CarouselItem>
                                        <Image src={product.image} alt={product.title} width={500} height={200} />

                                    </CarouselItem>
                                    <CarouselItem>
                                        <Image src={product.image} alt={product.title} width={500} height={200} />


                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel> */}
                            <Image src={product.image} alt={product.title} width={500} height={200} />

                        </div>
                    ) : (
                        <div className="w-full h-full bg-gray-400" />
                    )}


                    <div className="flex flex-[30%] ">
                        <h1>{product.userId}</h1>

                        {/* <Link href={`settings/${product.userId}/${user?.id}`}>Chat with Seller</Link> */}

                        <Button onClick={() => handleChat(product.userId)}>Chat with Seller</Button>

                    </div>

                </div>
            ) : ""}
        </div>
    );
};

export default ProductDetails;
