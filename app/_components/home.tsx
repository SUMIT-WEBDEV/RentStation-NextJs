
import React from "react";
import { db } from "@/lib/db";
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

  // const [initialProducts, setInitialProducts] = useState<Product[]>([])
  // const { storedLocation, storeLocation, setLocation } = useStoreLocation();
  // const [loadingproduct, setloadingproduct] = useState(true)

  // const isLocation = storedLocation?.city || ""


  // useEffect(() => {
  //   console.log("I called")
  //   const fetchInitialProduct = async () => {
  //     console.log("clickedddddd")

  //     const products = await getProducts({ location: isLocation });
  //     setloadingproduct(false);
  //     console.log("products are-", products)
  //     setInitialProducts(products)
  //   }
  //   fetchInitialProduct()
  // }, [isLocation])

  const initialProducts = await getProducts({ location });

  // console.log("initialProducts are", initialProducts)


  return (
    <div className="flex flex-col mt-5 w-full">
      {/* TODO: favourite  */}

      {/* TODO: Trending  */}
      <h1 className="lg:text-3xl text-xl py-2 pl-1 font-medium text-gray-900 lg:ml-28">
        Fresh Recommendations
      </h1>
      <div className="flex justify-center items-center">
        {/* <Products products={initialProducts} user={user} isLocation={location} /> */}
        <Products products={initialProducts} user={user} />
      </div>
    </div>
  );
}

export default Home;
