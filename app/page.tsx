import React from "react";

import CategoryCard from "./_components/category/category-card";
import Home from "./_components/home";
import { currentUserDetails } from "@/lib/auth";
import { cookies } from 'next/headers';

async function page() {

  const user = await currentUserDetails()

  const nextCookies = cookies().get('userLocation');

  const address = nextCookies ? JSON.parse(nextCookies.value).city : "";

  console.log("newcookies are", nextCookies)

  return (
    <div className=" w-full items-center flex justify-center bg-slate-50">
      <div className="lg:w-11/12 w-full">
        <CategoryCard address={address} />
        <Home user={user} location={address} />
      </div>
    </div>
  );
}

export default page;



// https://github.com/SUMIT-WEBDEV/RentStation-NextJs
// https://github.com/settings/applications/2433325
// https://console.cloud.google.com/apis/credentials?project=next-auth-410307
// https://rent-station-next-js.vercel.app