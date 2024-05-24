import React, {useEffect, useState} from 'react';
import {Answer, Question} from '../../types';
import {setQuizCreate} from '../../reducers/quizzes';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../store';

interface AnswerFromProps {
    answer: Answer;
    answerIndex: number;
    questionIndex: number;
}

const AnswerForm = ({ answer, answerIndex, questionIndex }: AnswerFromProps) => {
    const dispatch = useDispatch()
    const { quizCreate } = useSelector((state: State) => state.quizzes)

    const [isCorrect, setIsCorrect] = useState(answer.isCorrect)
    const [title, setTitle] = useState(answer.text)
    const [showInputAnswer, setShowInputAnswer] = useState(false)

    useEffect(() => {
        const updatedAnswers = quizCreate.questions.map((question: Question, questionIdx: number) => {
            if (questionIdx === questionIndex) {
                return {
                    ...question,
                    answers: question.answers.map((ans: Answer, ansIndex: number) => {
                        if (ansIndex === answerIndex) {
                            return {
                                ...ans,
                                isCorrect: isCorrect,
                                text: title
                            }
                        }
                        return ans
                    })
                }
            }
            return question
        })

        const updatedQuizCreate = {
            ...quizCreate,
            questions: updatedAnswers
        }

        dispatch(setQuizCreate(updatedQuizCreate));
    }, [answerIndex, isCorrect, title])

    const deleteAnswer = () => {
        const updatedAnswers = quizCreate.questions.map((question: Question, questionIdx: number) => {
            if (questionIdx === questionIndex) {
                return {
                    ...question,
                    answers: question.answers.filter((ans: Answer, ansIndex: number) => ansIndex !== answerIndex)
                }
            }
            return question
        })

        const updatedQuizCreate = {
            ...quizCreate,
            questions: updatedAnswers
        }

        dispatch(setQuizCreate(updatedQuizCreate))
    }

    return (
        <div
            className="h-10 mb-0.5 px-5 bg-emerald-200 flex items-center justify-between border border-solid border-emerald-800 rounded-md"
        >
            <div>
                {showInputAnswer ? (
                    <div className="px-2">{title || 'Answer'}</div>
                ) : (
                    <input
                        className="w-full h-8 px-2 border border-solid border-gray-700 rounded-md"
                        type="text"
                        placeholder="Enter the answer.."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus={true}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setShowInputAnswer(!showInputAnswer)
                            }
                        }}
                    />
                )}
            </div>
            <div className="flex justify-between gap-10">
                <div className="flex gap-2">
                    <button
                        className="w-32 h-8 bg-cyan-400 rounded-md"
                        onClick={() => setShowInputAnswer(!showInputAnswer)}
                    >
                        Change answer
                    </button>
                    <button
                        className="w-32 h-8 bg-red-400 rounded-md"
                        onClick={deleteAnswer}
                    >
                        Delete answer
                    </button>
                </div>
                <button
                    onClick={() => setIsCorrect(!isCorrect)}
                    className={`p-2 w-8 h-8 flex items-center justify-center border rounded-full ${isCorrect ? 'bg-green-500' : 'bg-gray-400'}`}
                    title="Click to mark the answer as 'correct'"
                >
                    {isCorrect ? '✔️' : ''}
                </button>
            </div>
        </div>
    );
};

export default AnswerForm;
