import { Suspense } from "react"
import Products from "./products";
import { getProducts } from "@/actions/get-product";
import { ProductSkeleton } from "./product-skelton";
import { cookies } from 'next/headers';
import { currentUserDetails } from "@/lib/auth";


async function HomeSuspense() {

  const user = await currentUserDetails()
  const nextCookies = cookies().get('userLocation');
  const address = nextCookies ? JSON.parse(nextCookies.value).city : "";

  const initialProducts = await getProducts({ location: address });

  return (
    <Products products={initialProducts} user={user} />
  );
}

const Home = () => {
  return (
    <div className="flex flex-col mt-5 w-full">
      <div className="mx-auto">
        <h1 className="lg:text-3xl text-xl py-2 pl-1 font-medium text-gray-900">
          Fresh Recommendations
        </h1>
        <div className="flex justify-center items-center">

          <Suspense fallback={<div className="w-full lg:w-auto mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
          }>
            <HomeSuspense />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Home


