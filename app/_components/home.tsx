import React, { useState } from "react";
import { db } from "@/lib/db";
import Products from "./products";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getProducts } from "@/actions/get-product";
import { currentUserDetails } from "@/lib/auth";

async function Home({ params }: any) {


  const products = await getProducts()
  const user = await currentUserDetails()

  console.log("products are", products)


  // const user = useCurrentUser()
  // console.log("params is ---->", params);
  console.log("user user ---->", user);

  return (
    <div className="flex flex-col mt-5 w-full">
      {/* TODO: favourite  */}

      {/* TODO: Trending  */}
      <h1 className="lg:text-3xl text-xl py-2 pl-1 font-medium text-gray-900 lg:ml-28">
        Fresh Recommendations
      </h1>
      <div className="flex justify-center items-center">
        <Products products={products} user={user} />
      </div>
    </div>
  );
}

export default Home;
