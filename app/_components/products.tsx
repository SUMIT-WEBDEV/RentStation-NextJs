"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "./product-skelton";
import { getProductbyLocationCategory, getProducts } from "@/actions/get-product";
import useStoreLocation from "@/store/user-location";


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

type ProductsProps = {
  products: Product[];
  user: any,
  location: any
};

export function Products({ products, user, location }: ProductsProps) {
  const [page, setPage] = useState<number>(1);
  const [productData, setProductData] = useState<Product[]>(products)
  const [loading, setLoading] = useState<boolean>(true);

  const { storedLocation } = useStoreLocation();

  useEffect(() => {
    setLoading(true)
  }, [storedLocation])

  useEffect(() => {
    setProductData(products);
    setLoading(false);
  }, [products]);


  const loadMoreProducts = async () => {
    const next: number = page + 1;
    const products = await getProducts({ page: next, location: location });
    setPage(next)
    setProductData([...productData, ...products])
  }

  return (
    <div className="lg:m-3 w-full">
      <h1 className="lg:text-3xl text-xl py-2 pl-1 font-medium text-gray-900">
        Fresh Recommendations
      </h1>
      <div className="flex justify-center w-full">
        <div className="w-full lg:w-auto mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {loading
            ?
            Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
            : productData.length === 0 ? <div>No products found</div> : (

              productData.map((product: Product) => {


                const isFavorite = user && user?.favorites && user?.favorites.some((fav: any) => fav.productId === product.id) || false

                return (
                  <ProductCard key={product.id} product={product} isFavorite={isFavorite} />)
              }
              )
            )
          }
        </div>
      </div>
      <div className="flex mt-3">
        <Button onClick={loadMoreProducts} className="m-auto">Load More</Button>
      </div>
    </div>
  );
}

export default Products;




