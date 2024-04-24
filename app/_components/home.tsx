import { Suspense } from "react"
import Products from "./products";
import { getProducts } from "@/actions/get-product";
import { ProductSkeleton } from "./product-skelton";
import { cookies } from 'next/headers';
import { currentUserDetails } from "@/lib/auth";
import NotFound from "./not-found-product";


async function HomeSuspense() {

  const user = await currentUserDetails()
  const nextCookies = cookies().get('userLocation');
  const address = nextCookies ? JSON.parse(nextCookies.value).city : "";

  const initialProducts = await getProducts({ location: address });

  return (
    <div>
      {
        initialProducts.length === 0 ? <div><NotFound /></div> : <Products products={initialProducts} user={user} />
      }
    </div>
  );
}

const Home = () => {
  return (
    <div className="flex flex-col mt-5 w-full">
      <div className="mx-auto">

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
