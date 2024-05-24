import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setQuizzes } from './reducers/quizzes';
import { Quiz } from './types';
import { saveToLocalStorage } from './httpImitation/http';
import initialData from './data';

import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import QuizComponent from './pages/QuizComponent';
import Layout from './components/Layout';

function App() {
    const dispatch = useDispatch()
    const existingData = localStorage.getItem('quizzes')

    useEffect(() => {
        if (!existingData) {
            dispatch(setQuizzes(initialData))
            saveToLocalStorage<Quiz[]>('quizzes', initialData)
                .then(() => {
                    console.log('Data saved successfully')
                })
                .catch((error) => {
                    console.error('Failed to save data:', error)
                })
        }
    }, [existingData])

  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/create/:quizId" element={<CreateQuiz />} />
              <Route path="create" element={<CreateQuiz />} />
              <Route path="quiz/:id" element={<QuizComponent />} />
          </Route>
      </Routes>
  )
}

export default App;
