import ProductFilter from "@/app/_components/product-filter";
import Products from "@/app/_components/products";
import { db } from "@/lib/db";
import React from "react";

async function page({ params }: any) {
  console.log("params", params);

  const searchTitle = params.item.toLowerCase();

  const products = await db.products.findMany({
    where: {
      title: {
        contains: searchTitle,
        mode: "insensitive",
      },
    },
  });

  if (products.length === 0) {
    return <div> No result found on this category</div>;
  }

  return (
    <div>
      <ProductFilter />
      <Products products={products} />
    </div>
  );
}

export default page;
