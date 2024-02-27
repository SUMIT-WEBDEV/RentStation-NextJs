import React from "react";
import Navbar from "../_components/navbar";
import MobileFooter from "@/components/ui/mobile-footer";
// import CategoryCards from "../_components/category-cards";
import CategoryCard from "../_components/category-card";
import Footer from "../_components/footer";
import ProductForm from "../_components/product-form";
import Home from "../_components/home";
import Image from "next/image";

function page() {
  return (
    <div className=" w-full items-center flex justify-center bg-slate-50 ">
      <div className="lg:w-11/12 w-full">
        {/* <Navbar /> */}
        <CategoryCard />

        <Home />
        {/* <Image src="/next.svg" width={1800} height={200} alt="" /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default page;
