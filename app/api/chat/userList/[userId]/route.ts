import { db } from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { userId } = params;
    // Find distinct users whom the current user has exchanged messages with
    const inboxUsers = await db.message.findMany({
      where: {
        senderId: {
          not: userId, // Exclude messages sent by the current user
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
      include: {
        conversations: {
          include: {
            messages: true,
          },
        },
      },
    });

    const response = NextResponse.json({
      message: "inbox users data recieve successfully",
      success: true,
      users,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
