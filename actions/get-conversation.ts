"use server";

import { db } from "@/lib/db";

export const getConversationMembers = async (id: string) => {
  try {
    const conversation = await db.conversation.findUnique({
      where: {
        id: id,
      },
      include: {
        members: true, // Include the members of the conversation
      },
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return conversation.members;
  } catch (error) {
    console.error("Error fetching conversation members:", error);
    throw new Error("Failed to fetch conversation members");
  }
};
