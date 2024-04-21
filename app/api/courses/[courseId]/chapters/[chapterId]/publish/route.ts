import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string , chapterId : string } }
) {
  try {
    const { userId } = auth();
    console.log("params", params);
    console.log("userId", userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const publishedCourse = await db.chapter.update({
      where: {
        id: params.chapterId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}