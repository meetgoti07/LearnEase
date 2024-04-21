import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/lib/db";
import { PrismaClient } from '@prisma/client';

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      }
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        }
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          }
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId
      }
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      }
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        }
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      }
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        }
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          }
        });
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        }

      });

      const quizData  = await axios.post("http://127.0.0.1:8000/transcript/", {url: values.videoUrl});


      await db.chapter.update({
        where: {
          id: params.chapterId,
        },
        data: {
          description: quizData.data.response.transcript, // Assuming the transcript is in quizData.transcript
        }
      });
      const db = new PrismaClient();


      const existingQuiz = await db.quiz.findFirst({
        where: {
          chapterId: params.chapterId,
        }
      });

      if (existingQuiz) {
        // Update the existing quiz
        let quiz = {};
        try {
          quiz = JSON.parse(JSON.stringify(quizData.data.response.quiz));
        } catch (error) {
          console.error("Invalid JSON in quizData.data.response.quiz");
        }
        await db.quiz.update({
          where: {
            id: existingQuiz.id,
          },
          data: {
            quiz: quiz,
          },
        });
      } else {
        // Create a new quiz
        let quiz = {};
        try {
          quiz = JSON.parse(JSON.stringify(quizData.data.response.quiz));
        } catch (error) {
          console.error("Invalid JSON in quizData.data.response.quiz");
        }
        await db.quiz.create({
          data: {
            quiz: quiz,
            chapterId: params.chapterId,
            courseId: params.courseId,
          },
        });
      }

      // Update the Quiz model with the quiz data

    }


    return NextResponse.json(chapter);
  }
  catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}