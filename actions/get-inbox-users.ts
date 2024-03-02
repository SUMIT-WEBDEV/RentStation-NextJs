"use server";

import { db } from "@/lib/db";

export async function getInboxUsers(currentUserId: string) {
  try {
    // Find distinct users whom the current user has exchanged messages with
    const inboxUsers = await db.message.findMany({
      where: {
        senderId: {
          not: currentUserId, // Exclude messages sent by the current user
        },
      },
      distinct: ["senderId"], // Get distinct sender IDs
      select: {
        senderId: true,
      },
    });

    // Extract sender IDs
    const senderIDs = inboxUsers.map((message) => message.senderId);

    // Fetch user details for the remaining user IDs
    const users = await db.user.findMany({
      where: {
        id: {
          in: [...senderIDs],
        },
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching inbox users:", error);
    throw error;
  }
}
