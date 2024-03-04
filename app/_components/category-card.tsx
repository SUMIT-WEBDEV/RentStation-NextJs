"use client";

import React from "react";
import {
  AccessTime,
  SportsEsports,
  ShoppingCart,
  BeachAccess,
  FitnessCenter,
  LocalLibrary,
  LocalHospital,
  MusicNote,
  LocalFlorist,
  Home,
  Flight,
  Wifi,
  Event,
  LocalMall,
  Movie,
  LocalGasStation,
  //   EcoOutlined,
  //   MotorcycleOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const iconData = [
  {
    icon: <AccessTime className="lg:text-4xl text-2xl text-orange-500" />,
    text: "Watches",
  },
  {
    icon: <SportsEsports className="lg:text-4xl text-2xl text-blue-500" />,
    text: "Sports Equipment",
  },
  {
    icon: <ShoppingCart className="lg:text-4xl text-2xl text-green-500" />,
    text: "Shopping Carts",
  },
  {
    icon: <BeachAccess className="lg:text-4xl text-2xl text-red-500" />,
    text: "Beach Accessories",
  },
  {
    icon: <FitnessCenter className="lg:text-4xl text-2xl text-purple-500" />,
    text: "Fitness Equipment",
  },
  {
    icon: <LocalLibrary className="lg:text-4xl text-2xl text-indigo-500" />,
    text: "Books",
  },
  {
    icon: <LocalHospital className="lg:text-4xl text-2xl text-red-500" />,
    text: "Medical Supplies",
  },
  {
    icon: <MusicNote className="lg:text-4xl text-2xl text-blue-500" />,
    text: "Music Instruments",
  },
  {
    icon: <LocalFlorist className="lg:text-4xl text-2xl text-green-500" />,
    text: "Flowers",
  },
  {
    icon: <Home className="lg:text-4xl text-2xl text-yellow-500" />,
    text: "Home Appliances",
  },
  {
    icon: <Flight className="lg:text-4xl text-2xl text-red-500" />,
    text: "Travel Gear",
  },
  {
    icon: <Wifi className="lg:text-4xl text-2xl text-blue-500" />,
    text: "Electronics",
  },
  {
    icon: <Event className="lg:text-4xl text-2xl text-green-500" />,
    text: "Event Supplies",
  },
  {
    icon: <LocalMall className="lg:text-4xl text-2xl text-orange-500" />,
    text: "Clothing",
  },
  {
    icon: <Movie className="lg:text-4xl text-2xl text-indigo-500" />,
    text: "Entertainment",
  },
  {
    icon: <LocalGasStation className="lg:text-4xl text-2xl text-red-500" />,
    text: "Fuel & Gas",
  },
];

function CategoryCard() {
  const router = useRouter();

  // const handleGetProduct = (title: string) => {
  //   router.push(`/settings/${title}`);
  // };

  return (
    <div className="flex justify-center items-center h-full">


      <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 justify-center py-3">
        {iconData.map((item, index) => (
          <Link
            href={`/location/${item.text}`}
            key={index}
            className="lg:w-32 min-w-16 w-auto flex flex-col lg:p-3 lg:border lg:border-gray-300 rounded-md justify-between cursor-pointer"
          // onClick={() => handleGetProduct(item.text)}
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
