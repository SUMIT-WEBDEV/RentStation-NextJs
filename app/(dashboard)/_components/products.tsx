"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function Products({ products }: any) {
  console.log("products", products);

  return (
    <div className="flex space-x-5 m-5">
      {products?.map((p: any) => (
        <Link
          className="border border-gray rounded-md p-5 w-72"
          href={`/settings/item/${p.title}-${p.id}`}
          key={p.id}
        >
          {p?.image ? (
            <Image src={p?.image} width={500} height={500} alt="Picture" />
          ) : (
            ""
          )}
          {/*  */}
          <p>{p.title}</p>
          <p>{p.category}</p>
          <p>{p.description}</p>
          <p>{p.price}</p>
          <p>{p.location}</p>
        </Link>
      ))}
    </div>
  );
}

export default Products;
