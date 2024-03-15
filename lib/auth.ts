import { auth } from "@/auth";
import { db } from "./db";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentUserDetails = async () => {
  try {
    const session = await auth();
    const id = session?.user.id;

    const userDetail = await db.user.findUnique({
      where: { id },
      include: {
        conversations: {
          include: {
            messages: true,
            members: true,
          },
        },
        favorites: true,
      },
    });

    return userDetail;
  } catch {
    return null;
  }
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
