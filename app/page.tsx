import React from "react";

import CategoryCard from "./_components/category/category-card";
import Home from "./_components/home";

async function page() {

  return (
    <div className=" w-full items-center flex justify-center bg-slate-50 flex-col">
      <div className="lg:w-11/12 w-full">
        <CategoryCard />
        <Home />
      </div>
    </div>
  );
}

export default page;


