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
      {products.map((p) => (
        <div key={p.id} className="border w-fit p-2 m-2">
          <p>{p.title}</p>
          <p>{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default page;
