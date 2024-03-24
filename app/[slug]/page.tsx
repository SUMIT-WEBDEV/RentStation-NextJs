import { ProductCard } from "@/app/_components/product-card";
import ProductFilter from "@/app/_components/product-filter";
import { db } from "@/lib/db";
import React from "react";
import { cookies } from 'next/headers';
import { getProductbyLocationCategoryItem } from "@/actions/get-product";
import CategoryLocationProductFilter from "../_components/product-category-location-filter";


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

async function page({ params, searchParams }: any) {

    //category
    const category = params.slug.toLowerCase();
    const item = searchParams?.item


    //location
    const nextCookies = cookies().get('userLocation');
    const location = nextCookies ? JSON.parse(nextCookies.value).city : "";

    console.log("searchParam is", searchParams)

    const products: Product[] = await getProductbyLocationCategoryItem({ location, category, title: item })

    // const products = await db.products.findMany({
    //     where: {
    //         location: {
    //             contains: location,
    //             mode: "insensitive",
    //         },
    //         category: {
    //             contains: category,
    //             mode: "insensitive",
    //         }
    //     },
    //     // take: 1. TODO
    // });

    if (products.length === 0) {
        return <div> No result found on this product category</div>;
    }

    console.log("products in the category", products)

    return (
        <div>
            <ProductFilter />
            <CategoryLocationProductFilter products={products} searchCategory={category} location={location} item={item} />

        </div>
    );
}

export default page;