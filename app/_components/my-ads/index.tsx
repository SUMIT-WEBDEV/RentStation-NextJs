"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardAd from './ad-cards';
import Wishlist from './my-wishlist';
import { ProductCard } from '../product-card';

type Product = {
    id: string;
    location: string;
    price: string;
    title: string;
    duration: string;
    category: string;
    image?: string | null;
    userId: string;
    createdAt: Date;
};

type wishlist = {
    id: string;
    productId: string;
    userId: string;
    createdAt: Date;
    product: Product
};

type myAdProps = {
    myAds: Product[];
    favorites: wishlist[];
};

const Myads = ({ myAds, favorites }: myAdProps) => {
    return (
        <div className='flex justify-center items-center w-full border z-10'>
            <div className='lg:w-6/12 w-full lg:mx-28 lg:my-8 p-4 border-black'>

                <Tabs defaultValue="myAds" className="w-full">
                    <TabsList className=''>
                        <TabsTrigger value="myAds">Account</TabsTrigger>
                        <TabsTrigger value="wishlist">WishList</TabsTrigger>
                    </TabsList>
                    <TabsContent value="myAds" className=''>
                        <div className="">
                            {
                                myAds.map((ad: any, index: any) => (
                                    <CardAd key={ad.id} {...ad} />
                                ))
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="wishlist">

                        {/* {favorites && favorites.product && favorites?.product?.map((product: Product) => <ProductCard key={product.id} product={product} />)} */}
                        <div className="w-full lg:w-auto mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                            {favorites ?
                                favorites.map((f) => (
                                    <ProductCard key={f.id} product={f.product} isFavorite={true} />
                                )) : "No Products in WishList"
                            }
                        </div>

                    </TabsContent>
                </Tabs>
            </div>

        </div>
    )
}

export default Myads