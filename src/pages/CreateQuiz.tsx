import React, {useEffect, useState} from 'react';
import QuestionForm from '../components/QuestionForm';
import {Question, Quiz} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../store';
import {setQuizCreate, setQuizzes} from '../reducers/quizzes';
import {saveToLocalStorage} from '../httpImitation/http';
import {useNavigate, useParams} from 'react-router-dom';

const CreateQuiz = () => {
    const { quizId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { quizzes } = useSelector((state: State) => state.quizzes)
    const { quizCreate } = useSelector((state: State) => state.quizzes)

    const [title, setTitle] = useState('')

    useEffect(() => {
        if (quizId) {
            const quizToEdit = quizzes.find((quiz: Quiz) => quiz.id === quizId)
            setTitle(quizToEdit.title)
        }
    }, [])

    useEffect(() => {
        if (quizId) {
            const quizToEdit = quizzes.find((quiz: Quiz) => quiz.id === quizId)
            if (quizToEdit) {
                const updateQuizToEdit = {
                    ...quizToEdit,
                    title: title
                }
                dispatch(setQuizCreate(updateQuizToEdit))

            }
        }
    }, [quizId, quizzes, title, dispatch])

    const newId = !quizId && quizzes.length > 0 ? `${parseInt(quizzes[quizzes.length - 1].id) + 1}` : '1'

    useEffect(() => {
        if (!quizId) {
            const updatedQuizCreate = {
                ...quizCreate,
                id: newId,
                title: title
            }
            console.log(title)
            dispatch(setQuizCreate(updatedQuizCreate))
        }
    }, [title])

    const addQuestion = () => {
        const newQuestion: Question = { question: '', answers: [] }
        const updatedQuestions = [...quizCreate.questions, newQuestion]
        dispatch(setQuizCreate({ ...quizCreate, questions: updatedQuestions }))
    }

    const submit = () => {
        const updatedQuizzes = quizzes.map((q: Quiz) => q.id === quizCreate.id ? quizCreate : q)
        const data = quizId ? updatedQuizzes : [...quizzes, quizCreate]
        dispatch(setQuizzes(data))

        saveToLocalStorage<Quiz[]>('quizzes', data)
            .catch((error) => {
                console.error('Failed to save data:', error)
            })

        dispatch(setQuizCreate({ id: '', title: '', questions: [] }))

        navigate('/')
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-3/4 mt-5 p-2 flex flex-col justify-center items-center bg-emerald-100 border border-solid border-emerald-800 rounded-md">
                <input
                    className="w-full h-10 mb-3 px-2 border border-solid border-gray-700 rounded-md"
                    name="title"
                    type="text"
                    placeholder="Please enter your title of quiz.."
                    autoFocus={true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    className="w-full h-10 bg-emerald-400 rounded-md"
                    onClick={addQuestion}
                >
                    Add question
                </button>
                <div className="w-full">
                    {quizCreate && quizCreate.questions.map((question: Question, index: number) => (
                        <QuestionForm key={index} question={question} index={index}/>
                    ))}
                </div>
                <button
                    className="mt-5 w-full h-10 bg-emerald-400 rounded-md"
                    onClick={submit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CreateQuiz;
