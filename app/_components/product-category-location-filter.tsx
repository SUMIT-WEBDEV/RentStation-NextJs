"use client"
import useStoreLocation from '@/store/user-location';
import React, { useEffect, useState } from 'react'
import { ProductCard } from './product-card';
import { getProductbyLocationCategoryItem } from '@/actions/get-product';
import { useRouter } from 'next/navigation';

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

const CategoryLocationProductFilter = ({ products, searchCategory, location, item }: any) => {
    // const [userLocation, setUserLocation] = useState();
    // const [selectedItem, setSelectedItem] = useState<string>("");
    const [productData, setProductData] = useState<Product[]>(products)
    const { storedLocation } = useStoreLocation();

    useEffect(() => {
        const fetchProductData = async () => {
            const locationToUse = storedLocation?.city || location; // Use stored location if available, otherwise use the location prop
            const fetchedProducts = await getProductbyLocationCategoryItem({ location: locationToUse, category: searchCategory, title: item });
            setProductData(fetchedProducts);
        };

        fetchProductData();
    }, [storedLocation, searchCategory, item]);


    useEffect(() => {
        if (storedLocation && storedLocation.city) {
            let newUrl = `/${storedLocation.city}/${searchCategory}`;
            if (item) {
                newUrl += `?item=${item}`;
            }
            window.history.pushState({}, '', newUrl);
        }
    }, [storedLocation, searchCategory, item, location]);

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

export default CategoryLocationProductFilter;
