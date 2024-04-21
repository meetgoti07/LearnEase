import axios from 'axios';

async function getQuiz(courseId: string, chapterId: string) {
    console.log("[GET_QUIZ]", courseId, chapterId);
    try {
        const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/quiz`);
        console.log("[GET_QUIZ]", response.data);

        return response.data;
    } catch (error) {
        console.log("[GET_QUIZ]", error);
        return null;
    }
}

export { getQuiz };