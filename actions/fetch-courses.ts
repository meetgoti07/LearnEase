// import { PrismaClient, Course, Category } from "@prisma/client";


// type GetCourses = {
//   userId: string;
// };

// const prisma = new PrismaClient();

// export const fetchCourses = async ({
//   userId
// }: GetCourses): Promise<GetCourses> => {
//   try {
//     const courses = await prisma.course.findMany({
//       where: {
//         isPublished: true,
//         userId: userId,
//       },
//       include: {
//         category: true,
//         chapters: true,
//       },
//     });

//     return courses;
//   } catch (error) {
//     console.log("[GET_COURSES]", error);
//     return null;
//   }
// };