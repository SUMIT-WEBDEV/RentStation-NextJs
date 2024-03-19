"use client"

import React, { useEffect, useState } from "react";
import { db } from "@/lib/db";
import Products from "./products";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getProducts } from "@/actions/get-product";
import useStoreLocation from "@/store/user-location";
// import { currentUserDetails } from "@/lib/auth";

type Product = {
  id: string;
  location: string;
  price: string;
  title: string;
  duration: string;
  category: string;
  image?: string | null;
  userId: string;
  createdAt: Date;
};


function Home({ user }: any) {

  const [initialProducts, setInitialProducts] = useState<Product[]>([])
  const { storedLocation, storeLocation, setLocation } = useStoreLocation();
  const [loadingproduct, setloadingproduct] = useState(true)

  console.log("storedLocation in product page---->", storedLocation?.city)

  const isLocation = storedLocation?.city || ""


  useEffect(() => {
    console.log("I called")
    const fetchInitialProduct = async () => {
      console.log("clickedddddd")

      const products = await getProducts({ location: isLocation });
      setloadingproduct(false);
      console.log("products are-", products)
      setInitialProducts(products)
    }
    fetchInitialProduct()
  }, [isLocation])

  console.log("initialProducts are", initialProducts)

  // const products = await getProducts()

  // console.log("products are", products)

  // const user = useCurrentUser()
  // console.log("params is ---->", params);
  // console.log("user user ---->", user);

  return (
    <div className="flex flex-col mt-5 w-full">
      {/* TODO: favourite  */}

      {/* TODO: Trending  */}
      <h1 className="lg:text-3xl text-xl py-2 pl-1 font-medium text-gray-900 lg:ml-28">
        Fresh Recommendations
      </h1>
      <div className="flex justify-center items-center">
        <Products products={initialProducts} user={user} loadingproduct={loadingproduct} isLocation={isLocation} />
      </div>
    </div>
  );
}

export default Home;
