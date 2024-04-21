// 'use client';

// import { useState, useEffect } from 'react';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// function LeaderboardPage() {
//   const [courses, setCourses] = useState([]);
//   const [chapters, setChapters] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [selectedChapter, setSelectedChapter] = useState(null);

// useEffect(() => {
//     // Fetch courses for the user
//     const fetchCourses = async () => {
//         const courses: { id: string; userId: string; title: string; description: string | null; imageUrl: string | null; price: number | null; isPublished: boolean; categoryId: string | null; createdAt: Date; updatedAt: Date; }[] = await prisma.course.findMany({ where: { userId: 'user-id' } });
//         setCourses(courses);
//     };

//     fetchCourses();
// }, []);

//   useEffect(() => {
//     // Fetch chapters for the selected course
//     const fetchChapters = async () => {
//       if (!selectedCourse) return;
//       const chapters = await prisma.chapter.findMany({ where: { courseId: selectedCourse.id } });
//       setChapters(chapters);
//     };

//     fetchChapters();
//   }, [selectedCourse]);

//   useEffect(() => {
//     // Fetch leaderboard entries for the selected chapter
//     const fetchLeaderboard = async () => {
//       if (!selectedChapter) return;
//       const leaderboard = await prisma.leaderboard.findMany({ where: { chapterId: selectedChapter.id } });
//       setLeaderboard(leaderboard);
//     };

//     fetchLeaderboard();
//   }, [selectedChapter]);

//   return (
//     <div>
//       <select onChange={e => setSelectedCourse(e.target.value)}>
//         {courses.map(course => <option value={course.id}>{course.name}</option>)}
//       </select>

//       {selectedCourse && (
//         <select onChange={e => setSelectedChapter(e.target.value)}>
//           {chapters.map(chapter => <option value={chapter.id}>{chapter.name}</option>)}
//         </select>
//       )}

//       {selectedChapter && (
//         <table>
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Marks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaderboard.map(entry => (
//               <tr>
//                 <td>{entry.userId}</td>
//                 <td>{entry.marks}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default LeaderboardPage;