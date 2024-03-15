"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { addToFavorite } from "@/actions/add-to-favorite";
import { currentUser } from "@/lib/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Heart } from "lucide-react";

type Favorite = {
    id: string;
    userId: string
}


type Product = {
    id: string;
    location: string;
    price: string;
    title: string;
    duration: string;
    image?: string | null;
};

type ProductCardProps = {
    product: Product;
    isFavorite: boolean
};



export function ProductCard({ product, isFavorite }: ProductCardProps) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const user = useCurrentUser()
    console.log("user", user)

    const handleFavorite = (productId: string) => {
        if (user) {
            const values = {
                userId: user.id,
                productId,
            }
            addToFavorite(values).then((data) => console.log("data-----> ", data))
        }
    }


    return (
        <div
            className="border border-gray rounded-md lg:p-3 p-2 h-fit w-full "
        // href={`/item/${product.title}-${product.id}`}
        >
            {/* <div className="w-auto h-40 lg:h-60 z-10 bg-red-200 aspect-square"> */}
            <div className="w-full z-10 ">
                {product.image && (
                    <Image src={product.image} width={250} height={250} alt="Picture" className="object-cover aspect-square" />
                )}
            </div>
            <div className="flex flex-col h-full justify-between space-y-3 pt-5 ">
                <div className="h-16">
                    <div className="flex justify-between items-center">

                        <p className="font-bold text-lg lg:text-xl">${product.price}/{product.duration}</p>

                        <div onClick={(e) => e.stopPropagation()}>

                            <p className="cursor-pointer" onClick={() => handleFavorite(product.id)}>
                                {
                                    isFavorite ? <Heart fill="black" /> :
                                        <Heart />
                                }
                            </p>
                        </div>


                    </div>
                    <p className="text-gray-700 text-sm">{product.title}</p>
                </div>
                <div className="flex">
                    <p className="text-xs truncate flex-1">{product.location}</p>
                    <p className="text-xs flex-[0.4] text-end">10 JAN</p>
                </div>
            </div>


        </div>
    );
}
