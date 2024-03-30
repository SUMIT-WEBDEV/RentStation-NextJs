"use client"
import useStoreLocation from '@/store/user-location';
import React, { useEffect, useState } from 'react'
import { ProductCard } from './product-card';
import { getProductbyLocationCategory } from '@/actions/get-product';

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

const CategoryLocationProductFilter = ({ products, searchCategory }: any) => {
    const [productData, setProductData] = useState<Product[]>(products)
    const { storedLocation } = useStoreLocation();

    useEffect(() => {
        setProductData(products);
    }, [products]);


    // useEffect(() => {

    //     const fetchProductData = async () => {
    //         const locationToUse = storedLocation?.city;
    //         const fetchedProducts = await getProductbyLocationCategory({ location: locationToUse, category: searchCategory });
    //         setProductData(fetchedProducts);
    //     };

    //     fetchProductData();
    // }, [storedLocation, searchCategory]);

    // for changing the url without reloading the page
    useEffect(() => {
        console.log("I called Immediatly")
        if (storedLocation && storedLocation.city) {
            let newUrl = `/${storedLocation.city}/${searchCategory}`;
            // if (item) {
            //     newUrl += `?item=${item}`;
            // }
            window.history.pushState({}, '', newUrl);
        }
    }, [storedLocation, searchCategory]);

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

export default CategoryLocationProductFilter;
