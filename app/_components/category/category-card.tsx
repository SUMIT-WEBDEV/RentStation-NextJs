"use client"
import React, { useState } from "react";
import Link from "next/link";
import { iconData } from "./category-data";

function CategoryCard({ address }: any) {
  const [userLocation, setUserLocation] = useState(address);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 justify-center py-3 lg:w-auto w-11/12">
        {iconData.map((item, index) => (
          <Link
            key={index}
            href={`/${userLocation ? userLocation + "/" : ""}${item.text}`}
          >
            <a>
              <div className="lg:w-32 min-w-16 w-auto flex flex-col lg:p-3 lg:border lg:border-gray-300 rounded-md justify-between cursor-pointer lg:hover:shadow-md">
                <div className="text-center">{item.icon}</div>
                <div className="lg:h-9 h-6">
                  <p className="text-center lg:text-xs text-[0.5rem] mt-2">
                    {item.text}
                  </p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;
