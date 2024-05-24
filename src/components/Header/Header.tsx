import React from 'react';
import {useNavigate} from 'react-router-dom';
import {setQuizCreate} from '../../reducers/quizzes';
import {useDispatch} from 'react-redux';

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const createQuiz = () => {
        navigate('/create')
    }

    const homePage = () => {
        dispatch(setQuizCreate({ id: '', title: '', questions: [] }))
        navigate('/')
    }

    return (
        <div className="w-full h-14 px-10 bg-emerald-600 flex justify-between items-center">
            <button
                className="text-lg font-medium"
                onClick={homePage}
            >
                Home
            </button>
            <button
                className="h-7 px-1 bg-emerald-400 rounded-md text-lg"
                onClick={createQuiz}
            >
                Create quiz
            </button>
        </div>
    );
};

export default Header;
