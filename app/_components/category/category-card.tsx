"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useStoreLocation from "@/store/user-location";
import { useRouter } from "next/navigation";
import { iconData } from "./category-data";

function CategoryCard({ address }: any) {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState(address);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const { storedLocation } = useStoreLocation();

  // console.log("storedLocation is", storedLocation)

  // useEffect(() => {
  //   // setUserLocation(storedLocation?.city || "");
  //   router.push(`/${userLocation}/${selectedItem}`)
  //   console.log("I am called here")
  // }, [storedLocation]);

  const handleItemClick = (itemText: string) => {
    if (userLocation) {
      router.push(`/${userLocation}/${itemText}`);
    } else {
      router.push(`/${itemText}`);
    }
    setSelectedItem(itemText)
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 justify-center py-3 lg:w-auto w-11/12">
        {iconData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item.text)}
            className="lg:w-32 min-w-16 w-auto flex flex-col lg:p-3 lg:border lg:border-gray-300 rounded-md justify-between cursor-pointer lg:hover:shadow-md"
          >
            <div className="text-center">{item.icon}</div>
            <div className="lg:h-9 h-6">
              <p className="text-center lg:text-xs text-[0.5rem] mt-2">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;
