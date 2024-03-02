import { db } from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

// TODO: authorize the access
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { userId } = params;

    // Fetch user details for the remaining user IDs
    const userDetail = await db.user.findUnique({
      where: { id: userId },
      include: {
        conversations: {
          include: {
            messages: true,
            members: true,
          },
        },
      },
    });

    // const response = NextResponse.json({
    //   message: "user detail recieve successfully",
    //   success: true,
    //   users,
    // });

    return NextResponse.json(userDetail);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
