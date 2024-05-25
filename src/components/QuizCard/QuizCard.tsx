import React from 'react';
import { Quiz } from '../../types';
import { saveToLocalStorage } from '../../httpImitation/http';
import { setQuizzes } from '../../reducers/quizzes';
import { useDispatch, useSelector } from 'react-redux';
import {State} from '../../store';
import {useNavigate} from 'react-router-dom';

interface QuizCardI {
    quiz: Quiz;
    index: number;
}

const QuizCard = ({ quiz, index }: QuizCardI) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { quizzes } = useSelector((state: State) => state.quizzes)

    const deleteQuiz = () => {
        const updateData = [...quizzes.slice(0, index), ...quizzes.slice(index + 1)]
        dispatch(setQuizzes(updateData))
        saveToLocalStorage<Quiz[]>('quizzes', updateData)
            .catch((error) => {
                console.error('Failed to update data:', error)
            })
    }

    const quizNav = () => {
        navigate(`/quiz/${quiz.id}`)
    }

    const editNav = (quizId: number | string) => {
        navigate(`/create/${quizId}`)
    }


    return (
        <div
            className="relative w-full flex justify-center items-center bg-emerald-100 border border-solid border-gray-600 rounded-md"
            onClick={quizNav}
        >
            <button
                className="absolute top-1 left-3 px-1 bg-emerald-400 rounded-md"
                onClick={(e) => {
                    e.stopPropagation()
                    editNav(quiz.id)
                }}
            >
                Edit
            </button>
            <div
                className="text-lg font-medium"
            >
                {quiz.title}
            </div>
            <button
                className="absolute top-1 right-3 px-1 bg-red-600 rounded-md text-white"
                onClick={(e) => {
                    e.stopPropagation()
                    deleteQuiz()
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default QuizCard;
