import React from "react";
import Image from "next/image";
import Link from "next/link";

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
};

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            className="border border-gray rounded-md lg:p-3 p-2 bg-white h-fit w-full"
            href={`/item/${product.title}-${product.id}`}
        >
            {/* <div className="w-auto h-40 lg:h-60 z-10 bg-red-200 aspect-square"> */}
            <div className="w-full z-10 ">
                {product.image && (
                    <Image src={product.image} width={250} height={250} alt="Picture" className="object-cover aspect-square" />
                )}
            </div>
            <div className="flex flex-col h-full justify-between space-y-3 pt-5">
                <div className="h-16">
                    <p className="font-bold text-lg lg:text-xl">${product.price}/{product.duration}</p>
                    <p className="text-gray-700 text-sm">{product.title}</p>
                </div>
                <div className="flex">
                    <p className="text-xs truncate flex-1">{product.location}</p>
                    <p className="text-xs flex-[0.4] text-end">10 JAN</p>
                </div>
            </div>
        </Link>
    );
}
