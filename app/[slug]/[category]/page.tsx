import { getProductbyLocationCategory } from "@/actions/get-product";
import { BreadcrumbWithCustomSeparator } from "@/app/_components/breadcrumb";
import CategoryLocationProductFilter from "@/app/_components/product-category-location-filter";
import ProductFilter from "@/app/_components/product-filter";
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

  const category = params.category.toLowerCase(); // category
  const location = params.slug.toLowerCase(); // location

  const products = await getProductbyLocationCategory({ location, category })

  console.log("products in the category", products)
  console.log("searchCategory in the category", category)

  const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: category, url: `/` },
  ];


  if (products.length === 0) {
    return <div> No result found on this category</div>;
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="w-full bg-gray-100">
        <div className="h-5 p-5 px-24 flex flex-col justify-center w-4/12 items-center">
          <BreadcrumbWithCustomSeparator paths={breadcrumbItems} />
        </div>
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