import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,) {
  try {
    const { userId, courseId, chapterId, marks } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const leaderbrduser = await db.leaderboard.findFirst({
      where: {
        courseId: courseId,
        userId: userId,
        chapterId: chapterId,
      }
    });

    const lead = await db.leaderboard.create({
      data: {
        userId: userId,
        courseId: courseId,
        chapterId: chapterId,
        marks: marks,
      }
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}