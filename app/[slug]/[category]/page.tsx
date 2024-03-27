import { getProductbyLocationCategory } from "@/actions/get-product";
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

// location/?item=category

async function page({ params }: any) {

  console.log("params", params);

  const searchCategory = params.category.toLowerCase();
  const location = params.slug.toLowerCase();


  // console.log("locatiom", location, "searchTitle")
  console.log("searchCategory is", params.category.toLowerCase())
  console.log("location is", params.slug.toLowerCase())


  const products: Product[] = await getProductbyLocationCategory({ location, category: searchCategory, })

  if (products.length === 0) {
    return <div> No result found on this category</div>;
  }

  console.log("products in the category", products)

  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto">
        <ProductFilter />
        <div className="flex justify-center items-center">
          <CategoryLocationProductFilter products={products} searchCategory={searchCategory} />
        </div>
      </div>
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