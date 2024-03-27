"use client"
import useStoreLocation from '@/store/user-location';
import React, { useEffect, useState } from 'react'
import { ProductCard } from './product-card';
import { getProductbyLocationCategoryItem } from '@/actions/get-product';

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

const LocationProductFilter = ({ products, item, category, location }: any) => {
    const [productData, setProductData] = useState<Product[]>(products)
    const { storedLocation } = useStoreLocation();



    useEffect(() => {
        console.log("I called Immediatly")
        const locationToUse = storedLocation?.city;

        let products;

        const fetchProductData = async () => {
            if (storedLocation) {
                products = await getProductbyLocationCategoryItem({ location: locationToUse, title: item })
                setProductData(products);
            } else {
                products = await getProductbyLocationCategoryItem({ category })
                setProductData(products);
            }
        };

        fetchProductData();

    }, [storedLocation, item, category]);


    return (
        <div className="lg:m-3 w-full">

            <div className="flex justify-center w-full">
                <div className="w-full lg:w-auto mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {
                        productData.map((product: any) => (
                            <ProductCard key={product.id} product={product} isFavorite={false} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default LocationProductFilter;


