import ProductDetails from "@/app/(dashboard)/_components/product-details";
import { db } from "@/lib/db";
import React from "react";

async function page({ params }: any) {
  const productId = params.productName.split("-")[1];

  const product = await db.products.findUnique({
    where: {
      id: productId,
    },
  });

  console.log("productDetails---->", product)


  return (
    <div>
      <div className=" w-fit p-2 m-2">

        <ProductDetails product={product} />

        {/* <ProductDetails product={product} /> */}

      </div>
    </div>
  );
}

export default page;
