import { BreadcrumbWithCustomSeparator } from "@/app/_components/breadcrumb";
import ProductDetails from "@/app/_components/product-details";
import { db } from "@/lib/db";
import React from "react";

async function page({ params }: any) {
  const productId = params.productName.split("-")[1];

  const paramslabel = decodeURIComponent(params.productName).split("-")[0].replace(/\+/g, " ")

  const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: paramslabel, url: `/` },
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

  // console.log("productDetails---->", product);

  return (
    <>
      <BreadcrumbWithCustomSeparator paths={breadcrumbItems} />
      <div className="flex flex-col space-y-8">
        <div className="w-full bg-gray-100">
        </div>
        {product && <ProductDetails product={product} />}

      </div>
    </>

  );
}

export default page;

