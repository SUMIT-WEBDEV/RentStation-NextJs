"use server";

import * as z from "zod";
import { db } from "@/lib/db";

// Payload schema for posting a message
const PostMessagePayload = z.object({
  text: z.string(),
  senderId: z.string(),
  conversationId: z.string(),
});

export const postMessage = async (
  payload: z.infer<typeof PostMessagePayload>
) => {
  try {
    const { text, senderId, conversationId } = payload;

    // Create the message in the database
    const newMessage = await db.message.create({
      data: {
        text,
        senderId,
        conversationId,
      },
    });

    return newMessage;
  } catch (error) {
    console.error("Error posting message:", error);
    return { error: "Failed to post message" };
  }
};

// Payload schema for retrieving messages
const GetMessagesPayload = z.object({
  conversationId: z.string(),
});

export const getMessages = async (
  payload: z.infer<typeof GetMessagesPayload>
) => {
  try {
    const { conversationId } = payload;

    // Retrieve messages from the database for the given conversation ID
    const messages = await db.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc", // Or 'desc' depending on the order you want
      },
    });

    return messages;
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return { error: "Failed to retrieve messages" };
  }
};
