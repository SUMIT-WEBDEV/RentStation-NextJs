"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { ProductSchema } from "@/schemas";
import { db } from "@/lib/db";
// import { useCurrentUser } from "@/hooks/use-current-user";

export const createProduct = async (
  values: z.infer<typeof ProductSchema>,
  userId: any
) => {
  // console.log("validatedFields", values);
  // console.log("validatedFields2", userId);
  // const user = useCurrentUser();

  const validatedFields = ProductSchema.safeParse(values);

  // console.log("validatedFields");

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
