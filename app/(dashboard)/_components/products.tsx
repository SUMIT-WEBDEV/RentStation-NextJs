import Image from "next/image";
import Link from "next/link";
import React from "react";

type Product = {
  id: string;
  location: string;
  price: string;
  description: string;
  title: string;
  duration: string;
  category: string;
  image?: string | null;
  userId: string;
  createdAt: Date;
};

type ProductsProps = {
  products: Product[];
};

function Products({ products }: ProductsProps) {
  console.log("products", products);

  return (
    <div className="lg:m-3 w-full">
      <h1 className="lg:text-3xl text-xl py-4 ml-2 font-medium text-gray-900 lg:ml-28">
        Fresh Recommendations
      </h1>
      <div className="flex justify-center">
        <div className="flex lg:gap-3 gap-1 justify-start items-start flex-wrap">
          {products?.map((p: any) => (
            <Link
              className="border border-gray rounded-md lg:p-3 p-2 lg:w-[24.1%] w-[49%] bg-white"
              href={`/settings/item/${p.title}-${p.id}`}
              key={p.id}
            >
              {p?.image ? (
                <div className="relative w-auto h-36 lg:h-60">
                  <Image
                    src={p?.image}
                    layout="fill"
                    objectFit="cover"
                    alt="Picture"
                  />
                </div>
              ) : (
                ""
              )}

              <div className="flex flex-col justify-between h-full space-y-3 p-1">
                <div className="h-16">
                  <p className="font-bold text-lg lg:text-xl">
                    ${p.price}/{p.duration}
                  </p>
                  <p className="text-gray-700 text-sm">{p.title}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs truncate flex-1">{p.location}</p>
                  {/* <p>{p?.createdAt}</p> */}
                  <p className="text-xs flex-[0.4] text-end">10 JAN</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
