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
import { usePathname, useRouter } from "next/navigation";
import { createConversationId } from "@/actions/create-conversationId";



interface IUser {
    id: string;
    name: string | null
}
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
    user: IUser
}

interface ProductDetailsProps {
    product: Products;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const user = useCurrentUser()
    console.log("user is", user)
    const Router = useRouter()
    const currentPage = usePathname();


    const handleChat = (id: string) => {
        if (user) {
            createConversationId(user?.id, id).then((data) => {
                console.log("data is conversationId-----", data);
                Router.push(`/chat/new/${data.conversationId}/${id}`)
            }).catch(err => console.error(err))
        } else {
            Router.push(`/auth/login?callbackUrl=${encodeURIComponent(currentPage)}`);
        }
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

                    <div className="flex flex-[30%] bg-green-300 flex-col">
                        <div>seller id {product.userId}</div>
                        <br />
                        <div>seller Id {product.user.name}</div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div>
                            <h1>current user Id {user?.id}</h1>
                        </div>

                        {/* <Link href={`settings/${product.userId}/${user?.id}`}>Chat with Seller</Link> */}

                        <Button onClick={() => handleChat(product.userId)}>Chat with Seller</Button>

                    </div>

                </div>
            ) : ""}
        </div>
    );
};

export default ProductDetails;
