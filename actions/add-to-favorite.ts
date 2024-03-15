"use server";

import { db } from "@/lib/db";
import { favoriteSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addToFavorite = async (values: z.infer<typeof favoriteSchema>) => {
  const validatedIds = favoriteSchema.safeParse(values);

  if (!validatedIds.success) {
    return { error: "Invalid fields!" };
  }

  const { userId, productId } = validatedIds.data;

  console.log(validatedIds);

  try {
    const productExist = await db.favorite.findUnique({
      where: {
        productId_userId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (productExist) {
      await db.favorite.delete({
        where: {
          id: productExist.id,
        },
      });
      revalidatePath("/");
      revalidatePath("/my-ads");

      return { success: "Product removed from favorites!" };
    }

    await db.favorite.create({
      data: {
        userId,
        productId,
      },
    });

    revalidatePath("/");

    return { success: "Product is added to favorite!" };
  } catch (error) {
    return { error: "failed to add on wishlist" };
  }
};

// export const checkFav =
