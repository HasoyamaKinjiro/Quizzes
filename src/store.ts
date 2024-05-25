import {configureStore, Store} from '@reduxjs/toolkit';
import quizzesSlice from './reducers/quizzes';
import quizSlice from './reducers/quiz';

const makeStore = () =>
    configureStore({
        reducer: {
            [quizzesSlice.name]: quizzesSlice.reducer,
            [quizSlice.name]: quizSlice.reducer,
        },
        devTools: true,
    })

export type State = ReturnType<Store['getState']>;

export default makeStore();
