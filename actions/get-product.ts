"use server";

import * as z from "zod";
import { ProductSchema } from "@/schemas";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface productProps {
  page?: number;
  location?: string;
}

export const getProducts = async ({ page, location }: productProps = {}) => {
  const limit = 10;
  const pageNum = page || 1;

  const products = await db.products.findMany({
    where: {
      OR: [
        { location: { contains: location || "" } },
        { location: { startsWith: location || "" } },
      ],
    },
    skip: (pageNum - 1) * limit,
    // skip: page! - 1 || 0 * limit,
    take: limit,
  });

  return products;
};
