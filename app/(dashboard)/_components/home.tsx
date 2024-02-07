import React from "react";
import { db } from "@/lib/db";
import Products from "./products";

async function Home() {
  const products = await db.products.findMany();

  console.log("products", products);

  return (
    <div className="flex space-x-5 mt-5 w-full justify-center items-center">
      {/* TODO: favourite  */}

      {/* TODO: Trending  */}

      <Products products={products} />
    </div>
  );
}

export default Home;
