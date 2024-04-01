import { BreadcrumbWithCustomSeparator } from "@/app/_components/breadcrumb";
import ProductDetails from "@/app/_components/product-details";
import { db } from "@/lib/db";
import React from "react";

async function page({ params }: any) {
  const productId = params.productName.split("-")[1];

  const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: params.productName.split("-")[0], url: `/` },
  ];


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

    <div className="flex flex-col space-y-8">
      <div className="w-full bg-gray-100">
        <div className="h-5 p-5 px-24 flex flex-col justify-center w-4/12 items-center">
          <BreadcrumbWithCustomSeparator paths={breadcrumbItems} />
        </div>
      </div>
      {product && <ProductDetails product={product} />}

    </div>

  );
}

export default page;

