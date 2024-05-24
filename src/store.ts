import {configureStore, Store} from '@reduxjs/toolkit';
import quizzesSlice from './reducers/quizzes';

const makeStore = () =>
    configureStore({
        reducer: {
            [quizzesSlice.name]: quizzesSlice.reducer,
        },
        devTools: true,
    })

export type State = ReturnType<Store['getState']>;

export default makeStore();
