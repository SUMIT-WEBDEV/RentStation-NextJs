import { getProductbyLocationCategoryItem } from "@/actions/get-product";
import { ProductCard } from "@/app/_components/product-card";
import CategoryLocationProductFilter from "@/app/_components/product-category-location-filter";
import ProductFilter from "@/app/_components/product-filter";
import Products from "@/app/_components/products";
import { db } from "@/lib/db";
import React from "react";

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
  console.log("params", params);

  const searchCategory = params.category.toLowerCase();
  const location = params.slug.toLowerCase();
  const item = searchParams?.item


  // console.log("locatiom", location, "searchTitle")
  console.log("searchParam is", searchParams)


  const products: Product[] = await getProductbyLocationCategoryItem({ location, category: searchCategory, title: item })

  if (products.length === 0) {
    return <div> No result found on this category</div>;
  }

  console.log("products in the category", products)

  return (
    <div>
      <ProductFilter />

      <CategoryLocationProductFilter products={products} searchCategory={searchCategory} location={location} item={item} />

    </div>
  );
}

export default page;



// const products = await db.products.findMany({
//   where: {
//     location: {
//       contains: location,
//       mode: "insensitive",
//     },
//     category: {
//       contains: searchTitle,
//       mode: "insensitive",
//     },
//     title: {
//       contains: searchParams?.item || "",
//       mode: "insensitive",
//     }
//   },
//   // take: 1. TODO
// });