import { Suspense } from "react"
import Products from "./products";
import { getProducts } from "@/actions/get-product";
import { ProductSkeleton } from "./product-skelton";

async function HomeSuspense({ user, location }: any) {
  const initialProducts = await getProducts({ location });

  return (
    <Products products={initialProducts} user={user} />
  );
}

const Home = ({ user, location }: any) => {
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
            <HomeSuspense user={user} location={location} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Home

