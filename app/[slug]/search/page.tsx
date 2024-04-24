import { getProductbyLocationCategoryItem } from "@/actions/get-product";
import { BreadcrumbWithCustomSeparator } from "@/app/_components/breadcrumb";
import NotFound from "@/app/_components/not-found-product";
import { ProductCard } from "@/app/_components/product-card";
import CategoryLocationProductFilter from "@/app/_components/product-category-location-filter";
import ProductFilter from "@/app/_components/product-filter";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
// import { BreadcrumbWithCustomSeparator } from "../_components/breadcrumb";


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

async function page({ searchParams }: any) {

    const item = searchParams?.item

    const nextCookies = cookies().get('userLocation');
    const location = nextCookies ? JSON.parse(nextCookies.value).city : "";

    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: item, url: `/` },
    ];



    const products = await getProductbyLocationCategoryItem({ location, title: item });

    if (products.length === 0) {
        return (
            <NotFound />
        )
    }

    // console.log("products in the category", products)

    return (

        <div className="flex flex-col space-y-8 bg-yellow-400">
            <div className="w-full bg-gray-100">
                <BreadcrumbWithCustomSeparator paths={breadcrumbItems} />
            </div>
            <div className="flex flex-col w-full ">
                <div className="mx-auto">
                    <ProductFilter />
                    <div className="flex justify-center items-center">
                        <CategoryLocationProductFilter products={products} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default page;
