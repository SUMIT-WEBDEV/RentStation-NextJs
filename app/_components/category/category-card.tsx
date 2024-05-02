// "use client"

import React from "react";
import Link from "next/link";
import useStoreLocation from "@/store/user-location";
import { categoryData } from "./category-data";
import { cookies } from "next/headers";

function CategoryCard() {
  // const { storedLocation } = useStoreLocation();
  // const userLocation = storedLocation?.city
  const nextCookies = cookies().get('userLocation');
  const location = nextCookies ? JSON.parse(nextCookies.value).city : "";




  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 justify-center py-3 lg:w-auto w-full px-2">
        {categoryData.map((item, index) => (
          <Link
            key={index}
            // onClick={() => handleItemClick(item.text)}
            href={location ? `/${location}/${item.text}` : `/${item.text}`}
            className="lg:w-32 min-w-16 w-auto flex flex-col lg:p-3 lg:border lg:border-gray-300 rounded-md justify-between cursor-pointer lg:hover:shadow-md"
          >
            <div className="text-center">{item.icon}</div>
            <div className="lg:h-9 h-6">
              <p className="text-center lg:text-xs text-[0.5rem] mt-2">
                {item.text}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;