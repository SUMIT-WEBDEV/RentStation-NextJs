"use server";

import * as z from "zod";
import { db } from "@/lib/db";

export const createConversationId = async (
  userId: string,
  sellerId: string
) => {
  try {
    console.log("===================");
    console.log(userId);
    console.log(sellerId);
    console.log("===================");

    // Check if a conversation between these users already exists
    const existingConversation = await db.conversation.findFirst({
      where: {
        AND: [
          { members: { some: { id: userId } } },
          { members: { some: { id: sellerId } } },
        ],
      },
    });

    if (existingConversation) {
      // If conversation already exists, return its ID
      return { conversationId: existingConversation.id };
    } else {
      // If conversation doesn't exist, create a new one
      const newConversation = await db.conversation.create({
        data: {
          members: { connect: [{ id: userId }, { id: sellerId }] },
        },
      });
      return { conversationId: newConversation.id };
    }
  } catch (error) {
    console.error("Error creating conversation:", error);
    // Return a specific error message or code based on the error type
    return { error: "Failed to create conversation" };
  }
};
