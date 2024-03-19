import React from "react";

import CategoryCard from "./_components/category-card";
import Home from "./_components/home";
import { currentUserDetails } from "@/lib/auth";

async function page() {

  const user = await currentUserDetails()


  return (
    <div className=" w-full items-center flex justify-center bg-slate-50">
      <div className="lg:w-11/12 w-full">
        <CategoryCard />
        <Home user={user} />
      </div>
    </div>
  );
}

export default page;



// https://github.com/SUMIT-WEBDEV/RentStation-NextJs
// https://github.com/settings/applications/2433325
// https://console.cloud.google.com/apis/credentials?project=next-auth-410307
// https://rent-station-next-js.vercel.app