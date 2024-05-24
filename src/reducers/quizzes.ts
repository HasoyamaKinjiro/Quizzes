import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quiz } from '../types';

type InitState = {
    quizzes: Quiz[];
    quizCreate: Quiz;
}

export const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes: [],
        quizCreate: {
            id: '',
            title: '',
            questions: []
        },
    } as InitState,
    reducers: {
        setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
            state.quizzes = action.payload;
        },
        setQuizCreate: (state, action: PayloadAction<Quiz>) => {
            state.quizCreate = action.payload;
        }
    },
})

export const { setQuizzes, setQuizCreate } = quizzesSlice.actions;

export default quizzesSlice;
