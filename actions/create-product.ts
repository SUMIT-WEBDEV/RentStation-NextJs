"use server";

import * as z from "zod";
import { ProductSchema } from "@/schemas";
import { db } from "@/lib/db";

export const createProduct = async (
  values: z.infer<typeof ProductSchema>,
  userId: any
) => {
  const validatedFields = ProductSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { location, price, description, title, duration, category, image } =
    validatedFields.data;

  const productData = {
    location,
    price,
    description,
    title,
    duration,
    category,
    userId,
    image,
  };

  // console.log("productData", productData);

  try {
    await db.products.create({
      data: productData,
    });
    return { success: "Product is added!" };
  } catch (error) {
    console.error("Prisma error:", error);
    return { error: "Failed to add product." };
  }
};
