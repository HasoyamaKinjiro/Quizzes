import React, {useEffect, useRef, useState} from 'react';
import './styles/QuizComponent.css';
import { State } from '../store';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { Quiz } from '../types';
import {completeQuiz, incrementTimer, nextQuestion, setAnswered} from '../reducers/quiz';

const QuizComponent = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const quizState = useSelector((state: State) => state.quiz)
    const { quizzes } = useSelector((state: State) => state.quizzes)

    const [quiz, setQuiz] = useState<Quiz | undefined>(undefined)
    const answerRefs = useRef<(HTMLLIElement | null)[]>([])

    useEffect(() => {
        const foundQuiz = quizzes.find((quiz: Quiz) => quiz.id === id)
        setQuiz(foundQuiz)
    }, [id, quizzes])

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(incrementTimer())
        }, 1000)

        if (quizState.quizCompleted) clearInterval(interval)

        return () => clearInterval(interval)
    }, [quizState.quizCompleted, dispatch])

    const nextQuestionHandler = () => {
        if (quiz && quizState.questionId !== quiz.questions.length - 1 && quizState.answered) {
            dispatch(nextQuestion())
            resetAnswerStyles()
        }
        if (quiz && quizState.questionId === quiz.questions.length - 1) {
            dispatch(completeQuiz())
            const correctAnswers = quizState.answeredArr.filter((answer: boolean) => answer).length
            alert(`Congratulations, you answered ${correctAnswers} out of ${quiz.questions.length} correctly! It took you ${quizState.timer} seconds.`)
        }
    }

    const showCorrect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, isCorrect: boolean) => {
        if (!quizState.answered) {
            e.currentTarget.classList.add(isCorrect ? 'correct' : 'wrong')
            dispatch(setAnswered(isCorrect));
        }
    }

    const resetAnswerStyles = () => {
        answerRefs.current.forEach((ref) => {
            if (ref) {
                ref.classList.remove('correct')
                ref.classList.remove('wrong')
            }
        })
    }

    if (!quiz) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex justify-center">
            <div className="quiz-container">
                <div className="quiz-title">{quiz.title}</div>
                <div className="quiz-questionsOf">Question {quizState.questionId + 1} of {quiz.questions.length}</div>
                <hr />
                <div>
                    {quiz.questions.length > 0 && (
                        <div>
                            <h3>{quiz.questions[quizState.questionId].question}</h3>
                            <ul>
                                {quiz.questions[quizState.questionId].answers.map((answer, index) => (
                                    <li
                                        key={index}
                                        ref={(el) => (answerRefs.current[index] = el)}
                                        className="quiz-answer"
                                        onClick={(e) => showCorrect(e, answer.isCorrect)}
                                    >
                                        {answer.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button className="quiz-button" onClick={nextQuestionHandler}>Next</button>
                    <div className="quiz-timer">Time Elapsed: {quizState.timer} seconds</div>
                </div>
            </div>
        </div>
    );
};

export default QuizComponent;
