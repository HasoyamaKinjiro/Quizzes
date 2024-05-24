import React, {useEffect, useState} from 'react';
import './styles/Home.css';
import QuizCard from '../components/QuizCard';
import { Quiz } from '../types';
import { getFromLocalStorage } from '../httpImitation/http';
import {useDispatch, useSelector} from 'react-redux';
import { State } from '../store';
import { setQuizzes } from '../reducers/quizzes';

const Home = () => {
    const dispatch = useDispatch()
    const { quizzes } = useSelector((state: State) => state.quizzes)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        getFromLocalStorage<Quiz[]>('quizzes')
            .then((data) => {
                if (data) {
                    dispatch(setQuizzes(data))
                } else {
                    console.log('No data found')
                }
            })
            .catch((error) => {
                console.error('Failed to retrieve data:', error)
            })
    }, [dispatch])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const filteredQuizzes = quizzes.filter((quiz: Quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div>
            <div className="flex justify-center">
                <input
                    className="w-1/3 h-10 px-4 mt-1 rounded-md border border-gray-500 focus:outline-none focus:border-emerald-400"
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="quizzes-grid">
                {filteredQuizzes.map((quiz: Quiz, index: number) => (
                    <QuizCard key={index} quiz={quiz} index={index}/>
                ))}
            </div>
        </div>
    )
}

export default Home;
