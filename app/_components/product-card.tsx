"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { addToFavorite } from "@/actions/add-to-favorite";
import { currentUser } from "@/lib/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Heart } from "lucide-react";
import useStoreLocation from "@/hooks/use-location";
import dayjs from 'dayjs';
import { Skeleton } from "@/components/ui/skeleton";


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
    createdAt: Date
};

type ProductCardProps = {
    product: Product;
    isFavorite: boolean
};



export function ProductCard({ product, isFavorite }: ProductCardProps) {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const user = useCurrentUser()

    const handleFavorite = (e: React.MouseEvent<HTMLParagraphElement>, productId: string) => {
        e.preventDefault();
        e.stopPropagation()
        if (user) {
            const values = {
                userId: user.id,
                productId,
            }
            addToFavorite(values).then((data) => console.log("data-----> ", data))
        }
    }

    const createdAtDate = dayjs(product.createdAt);
    const formattedDate = createdAtDate.format('MMMM D');

    return (
        <Link
            className="border border-gray rounded-md lg:p-3 p-2 h-fit w-auto lg:w-[250px] "
            href={`/item/${product.title.split(' ').join('+').toLowerCase()}-${product.id}`}
        >
            <div className="w-full z-10 ">
                {product.image ? (
                    <Image src={product.image} width={250} height={250} alt="Picture" className="object-cover aspect-square" />
                ) :
                    <Skeleton className="h-40 lg:h-60  lg:w-64 w-auto" />
                }
            </div>
            <div className="flex flex-col h-full justify-between space-y-3 pt-5 ">
                <div className="h-16">
                    <div className="flex justify-between items-center">

                        <p className="font-bold text-lg lg:text-xl">₹{product.price}/{product.duration}</p>


                        <p className="cursor-pointer" onClick={(e) => handleFavorite(e, product.id)}>
                            {
                                isFavorite ? <Heart fill="black" /> :
                                    <Heart />
                            }
                        </p>

                    </div>
                    <p className="text-gray-700 text-sm">{product.title}</p>
                </div>
                <div className="flex">
                    <p className="text-xs truncate flex-1">{product.location}</p>
                    <p className="text-xs flex-1 text-end">{formattedDate}</p>
                </div>
            </div>


        </Link>
    );
}
