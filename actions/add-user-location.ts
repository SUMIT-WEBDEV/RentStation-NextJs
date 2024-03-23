"use server";

import { db } from "@/lib/db";
import { LocationSchema } from "@/schemas";
import { z } from "zod";

export const setUserLocation = async (
  values: z.infer<typeof LocationSchema>
) => {
  const validationResult = LocationSchema.safeParse(values);

  if (!validationResult.success) {
    return { error: "Invalid fields!" };
  }

  // Destructure validated location data
  const { city, lat, lng, address } = validationResult.data;

  try {
    await db.user.update({
      where: { id: "123" }, // Replace "123" with the actual user ID
      data: {
        location: {
          update: {
            city,
            lat,
            lng,
            address,
          },
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error setting user location:", error);
    return { error: "Failed to set user location." };
  }
};
