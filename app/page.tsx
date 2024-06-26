import React from "react";

import CategoryCard from "./_components/category/category-card";
import Home from "./_components/home";
// import NextNProgress from 'nextjs-progressbar';
// import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';


async function page() {

  return (
    <>
      {/* <NextNProgress /> */}
      {/* <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      /> */}
      <div className="h-full w-full items-center flex justify-center bg-slate-50 flex-col">
        <div className="lg:w-11/12 w-full">
          <CategoryCard />
          <Home />
        </div>
      </div>
    </>
  );
}

export const generateMetadata = async () => {

  return {
    title: "Local Rental Marketplace - Find and Rent Items Near You",
    description: " Discover a wide range of rental items available in your locality. From tools to electronics, find what you need for your short-term needs. Join our community and start renting today!"
  }
}

export default page;



// https://github.com/SUMIT-WEBDEV/RentStation-NextJs
// https://github.com/settings/applications/2433325
// https://console.cloud.google.com/apis/credentials?project=next-auth-410307
// https://rent-station-next-js.vercel.app

// TODO:
// - wishlist check login or not