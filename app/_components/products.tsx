"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "./product-skelton";
import { getProducts } from "@/actions/get-product";
import { useCurrentUser } from "@/hooks/use-current-user";



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
  user: any
};

export function Products({ products, user }: ProductsProps) {
  // export function Products() {
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const [productData, setProductData] = useState(products)


  const handleNext = () => {
    router.push(`/?page=${page}`);
  };





  const loadMoreProducts = async () => {
    const next: number = page + 1;
    const products = await getProducts({ page: next });
    setPage(next)
    setProductData([...productData, ...products])
  }


  // Determine loading state based on the length of products array
  const loading = productData.length === 0;
  // const loading = true;

  console.log("products on client side", products)

  return (
    <div className="lg:m-3 w-full">
      <div className="flex justify-center w-full">
        <div className="w-full lg:w-auto mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
            : productData.map((product: Product) => {


              const isFavorite = user && user?.favorites && user?.favorites.some((fav: any) => fav.productId === product.id);

              console.log("isFavorite is", isFavorite)

              return (
                <ProductCard key={product.id} product={product} isFavorite={isFavorite} />)
            }
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