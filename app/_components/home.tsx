
import React from "react";
import Products from "./products";
import { getProducts } from "@/actions/get-product";

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


async function Home({ user, location }: any) {

  const initialProducts = await getProducts({ location });

  return (
    <div className="flex flex-col mt-5 w-full">
      {/* TODO: favourite  */}

      {/* TODO: Trending  */}
      <div className="mx-auto">
        <h1 className="lg:text-3xl text-xl py-2 pl-1 font-medium text-gray-900">
          Fresh Recommendations
        </h1>
        <div className="flex justify-center items-center">
          <Products products={initialProducts} user={user} />
        </div>
      </div>
    </div>
  );
}

export default Home;
