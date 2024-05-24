import React, {useEffect, useState} from 'react';
import {Answer, Question} from '../../types';
import AnswerForm from '../AnswerForm';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../store';
import {setQuizCreate} from '../../reducers/quizzes';

interface QuestionFromProps {
    question: Question;
    index: number;
}

const QuestionForm = ({ question, index }: QuestionFromProps) => {
    const dispatch = useDispatch()
    const { quizCreate } = useSelector((state: State) => state.quizzes)

    const [title, setTitle] = useState(question.question)
    const [showInputTitle, setShowInputTitle] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)

    let answers = []
    if (quizCreate && quizCreate.questions && quizCreate.questions[index] && quizCreate.questions[index].answers) {
        answers = quizCreate.questions[index].answers
    }

    useEffect(() => {
        const updatedQuizCreate = {
            ...quizCreate,
            questions: quizCreate.questions.map((question: Question, idx: number | string) =>
                idx === index ? { ...question, question: title } : question
            )
        }

        dispatch(setQuizCreate(updatedQuizCreate))
    }, [index, title])

    const addAnswer = () => {
        if (!showAnswer) setShowAnswer(true)

        const newAnswer: Answer = { text: '', isCorrect: false }
        const updatedQuestions = [...quizCreate.questions]

        updatedQuestions[index] = {
            ...updatedQuestions[index],
            answers: [...updatedQuestions[index].answers, newAnswer]
        }

        dispatch(setQuizCreate({
            ...quizCreate,
            questions: updatedQuestions
        }))
        console.log(quizCreate.questions[index].answers)
    }

    const deleteQuestion = () => {
        const updatedQuestions = [...quizCreate.questions]
        updatedQuestions.splice(index, 1)

        dispatch(setQuizCreate({
            ...quizCreate,
            questions: updatedQuestions
        }))
    }

    return (
        <div className="mt-2">
            <div className="flex items-center justify-between">
                <div>
                    {showInputTitle ? (
                        <div className="px-2">{title}</div>
                    ) : (
                        <input

                            className="w-full h-10 px-2 border border-solid border-gray-700 rounded-md"
                            type="text"
                            placeholder="Enter title of question.."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus={true}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setShowInputTitle(!showInputTitle)
                                }
                            }}
                        />
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        className="w-32 h-10 bg-cyan-400 rounded-md"
                        onClick={() => setShowInputTitle(!showInputTitle)}
                    >
                        Change question
                    </button>
                    <button
                        className="w-32 h-10 bg-emerald-400 rounded-md"
                        onClick={addAnswer}
                    >
                        Add answer
                    </button>
                    <button
                        className="w-32 h-10 bg-yellow-400 rounded-md"
                        onClick={() => setShowAnswer(!showAnswer)}
                    >
                        Show answers
                    </button>
                    <button
                        className="w-32 h-10 bg-red-400 rounded-md"
                        onClick={deleteQuestion}
                    >
                        Delete question
                    </button>
                </div>
            </div>
            <div className="mt-2">
                {
                    showAnswer &&

                    answers.map((answer: Answer, answerIndex: number) => (
                    <AnswerForm key={answerIndex} answer={answer} answerIndex={answerIndex} questionIndex={index}/>
                ))}
            </div>
        </div>
    );
};

export default QuestionForm;
