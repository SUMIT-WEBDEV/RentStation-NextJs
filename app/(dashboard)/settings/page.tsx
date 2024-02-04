import React from "react";
import Navbar from "../_components/navbar";
import MobileFooter from "@/components/ui/mobile-footer";
// import CategoryCards from "../_components/category-cards";
import CategoryCard from "../_components/category-card";
import Footer from "../_components/footer";
import ProductForm from "../_components/product-form";
import Home from "../_components/home";

function page() {
  return (
    <div>
      {/* <Navbar /> */}
      <CategoryCard />
      <Home />
      {/* <Footer /> */}
    </div>
  );
}

export default page;
