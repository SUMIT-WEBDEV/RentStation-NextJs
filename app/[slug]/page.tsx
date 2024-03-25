import { ProductCard } from "@/app/_components/product-card";
import ProductFilter from "@/app/_components/product-filter";
import { db } from "@/lib/db";
import React from "react";
import { cookies } from 'next/headers';
import { getProductbyLocationCategoryItem } from "@/actions/get-product";
import LocationProductFilter from "../_components/product-location-filter";


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


// location/?item=itemsname

async function page({ params, searchParams, }: any) {

    //category
    const category = params.slug.toLowerCase();
    const item = searchParams?.item


    //location
    const nextCookies = cookies().get('userLocation');
    const location = nextCookies ? JSON.parse(nextCookies.value).city : "";

    console.log("searchParam is", searchParams)
    console.log("location is", location)

    const products: Product[] = await getProductbyLocationCategoryItem({ location, title: item, category })


    if (products.length === 0) {
        return <div> No result found on this product category</div>;
    }

    console.log("products in the category", products)

    return (
        <div>
            <ProductFilter />
            <LocationProductFilter products={products} item={item} category={category} location={location} />

        </div>
    );
}

export default page;
