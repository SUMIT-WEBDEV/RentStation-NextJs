"use server";
import { db } from "@/lib/db";

interface productProps {
  page?: number;
  location?: string;
}

export const getProducts = async ({ page, location }: productProps = {}) => {
  const limit = 10;
  const pageNum = page || 1;

  const products = await db.products.findMany({
    where: {
      OR: [{ location: { contains: location } }],
    },
    skip: (pageNum - 1) * limit,
    take: limit,
  });

  return products;
};

export const getProductbyLocationCategory = async ({
  location,
  category,
}: any) => {
  // console.log("in action get product", location, category);

  const products = await db.products.findMany({
    where: {
      OR: [
        {
          location: {
            contains: (location || "").toLowerCase(),
            mode: "insensitive",
          },
        },
        {
          location: {
            startsWith: (location || "").toLowerCase(),
            mode: "insensitive",
          },
        },
      ],
      category: {
        contains: category || "",
        mode: "insensitive",
      },
    },
    // take: 1. TODO
  });
  // console.log("my products1 ", products);
  return products;
};

export const getProductbyLocationCategoryItem = async ({
  location,
  title,
  category,
}: any) => {
  // console.log("in action get product", location, title, category);

  const products = await db.products.findMany({
    where: {
      OR: [
        {
          location: {
            contains: (location || "").toLowerCase(),
            mode: "insensitive",
          },
        },
        {
          location: {
            startsWith: (location || "").toLowerCase(),
            mode: "insensitive",
          },
        },
      ],
      title: {
        contains: title || "",
        mode: "insensitive",
      },
      category: {
        contains: category || "",
        mode: "insensitive",
      },
    },
    // take: 1. TODO
  });
  // console.log("my products2", products);
  return products;
};

// export const getProductbyLocationCategoryItem = async ({
//   location,
//   category,
//   title,
// }: any) => {
//   console.log("in action get product", location, category, title);

//   const products = await db.products.findMany({
//     where: {
//       OR: [
//         { title: { contains: title || "", mode: "insensitive" } },
//         { location: { contains: location || "" } },
//         { location: { startsWith: location || "" } },
//         { category: { contains: category || "", mode: "insensitive" } },
//       ],
//     },
//     // take: 1. TODO
//   });
//   console.log("mera products", products);
//   return products;
// };
