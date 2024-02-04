import { db } from "@/lib/db";
import React from "react";

async function page({ params }: any) {
  const productId = params.productName.split("-")[1];

  const product = await db.products.findUnique({
    where: {
      id: productId,
    },
  });

  return (
    <div>
      <div className="border w-fit p-2 m-2">
        <p>{product?.title}</p>
        <p>{product?.price}</p>
      </div>
    </div>
  );
}

export default page;
