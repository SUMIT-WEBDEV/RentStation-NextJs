import React from "react";
import ProductForm from "../_components/product-form";
import { BreadcrumbWithCustomSeparator } from "../_components/breadcrumb";

function page() {
  return (
    <div className="">
      {/* <BreadcrumbWithCustomSeparator /> */}
      <ProductForm />
    </div>
  );
}

export const generateMetadata = async () => {

  return {
    title: "List Your Items for Rent - Reach Local Renters Easily",
    description: "Ready to earn extra income? List your items for rent on our platform and connect with renters in your area. It's easy, secure, and hassle-free. Start listing today!"
  }
}



export default page;
