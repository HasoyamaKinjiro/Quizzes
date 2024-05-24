import React, {useEffect, useState} from 'react';
import './styles/QuizComponent.css';
import {Answer} from '../types';
import { State } from '../store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Quiz } from '../types';

const QuizComponent = () => {
    const [questionId, setQuestionId] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [answeredArr, setAnsweredArr] = useState<boolean[]>([])
    const [quiz, setQuiz] = useState<Quiz | undefined>(undefined)

    const { id } = useParams<{ id: string }>()
    const { quizzes } = useSelector((state: State) => state.quizzes)
    useEffect(() => {
        const fetchQuiz = async () => {
            const foundQuiz = await quizzes.find((quiz: Quiz) => quiz.id === id)
            setQuiz(foundQuiz);
        }
        fetchQuiz();
    }, [id, quizzes])

    if (!quiz) {
        return <div>Loading...</div>
    }

    const questions = quiz.questions

    const nextQuestion = () => {
        if (questionId !== questions.length - 1 && answered) {
            setQuestionId(questionId + 1)
            setAnswered(false)
            resetAnswerStyles()
        }
        if (questionId === questions.length - 1) {
            const correctAnswers = answeredArr.filter(answer => answer).length;
            alert(`Congratulations, you answered ${correctAnswers} out of ${questions.length} correctly!`)
        }

    }

    const showCorrect = (e: any, isCorrect: boolean) => {
        if (!answered) {
            setAnswered(true)

            if (isCorrect) {
                e.target.classList.add("correct")
                setAnsweredArr(prevState => [...prevState, true])
            }
            else {
                e.target.classList.add("wrong")
                setAnsweredArr(prevState => [...prevState, false])
            }
        }
    }

    const resetAnswerStyles = () => {
        const answerElements = document.querySelectorAll('.quiz-answer')

        answerElements.forEach(answer => {
            answer.classList.remove('correct')
            answer.classList.remove('wrong')
        })
    }

    return (
        <div className="flex justify-center">
            <div className="quiz-container">
                <div className="quiz-title">{quiz.title}</div>
                <div className="quiz-questionsOf">Question {questionId + 1} of {questions.length}</div>
                <hr/>
                <div>
                    <div>
                        {
                            questions.length > 0 && (
                                <div>
                                    <h3>{questions[questionId].question}</h3>
                                    <ul>
                                        {questions[questionId].answers.map((answer: Answer, answerIndex: number) => (
                                            <li
                                                key={answerIndex}
                                                className="quiz-answer"
                                                onClick={(e) => showCorrect(e, answer.isCorrect)}
                                            >
                                                {answer.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                    <button className="quiz-button" onClick={nextQuestion}>Next</button>
                </div>
            </div>
        </div>
    )
};

export default QuizComponent;
