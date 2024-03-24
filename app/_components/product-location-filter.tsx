"use client"
import useStoreLocation from '@/store/user-location';
import React, { useEffect, useState } from 'react'
import { ProductCard } from './product-card';
import { getProductbyLocationItem } from '@/actions/get-product';

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

const LocationProductFilter = ({ products, item }: any) => {
    const [productData, setProductData] = useState<Product[]>(products)
    const { storedLocation } = useStoreLocation();


    // console.log("storedlocation on product category page", storedLocation)

    useEffect(() => {

        // console.log("I called Immediatly")
        const fetchProductData = async () => {
            const locationToUse = storedLocation?.city;
            const fetchedProducts = await getProductbyLocationItem({ location, title: item })
            setProductData(fetchedProducts);
        };

        fetchProductData();
    }, [storedLocation, item]);


    return (
        <div>
            {
                productData.map((product: any) => (
                    <ProductCard key={product.id} product={product} isFavorite={false} />
                ))
            }
        </div>
    );
}

export default LocationProductFilter;