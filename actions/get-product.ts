"use server";

import * as z from "zod";
import { ProductSchema } from "@/schemas";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getProduct = async ({ page }: { page?: number } = {}) => {
  const limit = 4;
  const pageNum = page || 1;

  const products = await db.products.findMany({
    skip: (pageNum - 1) * limit,
    // skip: page! - 1 || 0 * limit,
    take: limit,
  });

  revalidatePath("/");
  return products;
};
