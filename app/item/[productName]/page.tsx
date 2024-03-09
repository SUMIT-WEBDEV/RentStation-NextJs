import ProductDetails from "@/app/_components/product-details";
import { db } from "@/lib/db";
import React from "react";

async function page({ params }: any) {
  const productId = params.productName.split("-")[1];

  const product = await db.products.findUnique({
    where: {
      id: productId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  console.log("productDetails---->", product);

  return (
    <div>
      <div className="">{product && <ProductDetails product={product} />}</div>
    </div>
  );
}

export default page;
