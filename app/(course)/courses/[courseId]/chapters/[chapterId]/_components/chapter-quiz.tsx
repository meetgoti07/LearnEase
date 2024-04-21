

import { useEffect, useState } from 'react';
import { getQuiz } from "@/actions/get-quiz";

import {toast} from "react-hot-toast";
import { useRouter } from 'next/navigation';

import { sendMarksToLeaderboard } from '@/actions/send-marks';

interface ChapterQuizProps {
    chapterId: string;
    userId:string;
    courseId: string;
    nextChapterId?: string;
}
interface chapInnerQuiz{
    quizData: Quiz[];
    userId:string;
    nextChapterId?: string;
    courseId: string;
    router: any;
    chapterId: string;
}


interface Quiz {
    question: string;
    options: string[];
    answer: number;

}

interface QuizData {
    transcript: string;
    quiz: Quiz[];
}



export const ChapterQuiz = ({chapterId,userId, courseId, nextChapterId}: ChapterQuizProps) => {
    const router = useRouter();
    const [quizData, setQuizData] = useState<null | QuizData>(null);
    useEffect(() => {
        const fetchQuizData = async () => {
            const data = await getQuiz(courseId, chapterId );
            // @ts-ignore
            setQuizData(data);
        };
        fetchQuizData().then(r => r);
    }, [chapterId, courseId]);

    // Render your component based on the state of quizData
    if (quizData === null) {
        return <div>Loading...</div>;
    } else {
        return <QuizComponent quizData={quizData.quiz} userId={userId} nextChapterId={nextChapterId} chapterId={chapterId} courseId={courseId} router={router}/>;
    }
}

const QuizComponent = ({ quizData, userId, nextChapterId, chapterId, courseId, router }: chapInnerQuiz) => {

    const [showQuiz, setShowQuiz] = useState(true);
    const [score, setScore] = useState<{ total: number; obtained: number; passed: boolean } | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

    const handleChange = (questionIndex: number, optionIndex: number) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = optionIndex;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleSubmit = async () => {
        let correctAnswers = 0;
        quizData.forEach( (question, index) => {
            if (question.answer === selectedAnswers[index]) {
                correctAnswers++;
            }
        } );
        const percentageCorrect = (correctAnswers / quizData.length) * 100;
    
       if (percentageCorrect < 80) {
        setScore({ total: quizData.length, obtained: correctAnswers, passed: false });
        alert("You scored less than 80%. Please try again.");
        setSelectedAnswers([]); // reset the selected answers
    } else {
        setScore({ total: quizData.length, obtained: correctAnswers, passed: true });

        // Call sendMarksToLeaderboard function
        const userIdd = userId ?? ''; // replace with actual userId
        const courseIdd = courseId; // replace with actual courseId
        const chapterIdd = chapterId; // replace with actual chapterId

        await sendMarksToLeaderboard(userIdd, courseIdd, chapterIdd, percentageCorrect);

        router.refresh();
        toast.success( "Progress updated" );
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        setShowQuiz(false);
        }
    };

    return (
        <div>
        {showQuiz ? (
            <div>
                {quizData.map((question, questionIndex) => (
                    <div key={questionIndex}>
                        <h2>{question.question}</h2>
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="mt-2">
                                <input
                                    type="radio"
                                    name={questionIndex.toString()}
                                    value={optionIndex}
                                    checked={selectedAnswers[questionIndex] === optionIndex}
                                    onChange={() => handleChange(questionIndex, optionIndex)}
                                    className="mr-2 leading-tight"
                                />
                                <label className="text-base">{option}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit Quiz
                </button>
            </div>
        ) : (
            <div>
                <p>You scored {score.obtained} out of {score.total}.</p>
                {score.passed ? <p>You passed the test!</p> : <p>Your score is less than 80%. Please try again.</p>}
            </div>
        )}
    </div>
    );
};
