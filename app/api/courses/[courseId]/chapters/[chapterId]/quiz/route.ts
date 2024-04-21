import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { courseId, chapterId } = params;

    // Fetch the quiz data for the given courseId and chapterId
    // This is just a placeholder, replace it with your actual code
    const quizData = await fetchQuizData(courseId, chapterId);

    return NextResponse.json(quizData);
  } catch (error) {
    console.log("[GET_QUIZ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function fetchQuizData(courseId: string, chapterId: string) {
    // Query the database for the quiz data for the given courseId and chapterId
    // This is just a placeholder, replace it with your actual code
    const quizData = await db.quiz.findFirst({
        where: {
            courseId: courseId,
            chapterId: chapterId
        }
    });

    return quizData || {};
}