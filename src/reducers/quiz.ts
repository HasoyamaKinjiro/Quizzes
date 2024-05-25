import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface QuizState {
    questionId: number;
    answered: boolean;
    answeredArr: boolean[];
    quizCompleted: boolean;
    timer: number;
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        questionId: 0,
        answered: false,
        answeredArr: [],
        quizCompleted: false,
        timer: 0,
    } as QuizState,
    reducers: {
        setAnswered(state, action: PayloadAction<boolean>) {
            state.answered = true;
            state.answeredArr.push(action.payload);
        },
        nextQuestion(state) {
            state.questionId += 1;
            state.answered = false;
        },
        completeQuiz(state) {
            state.quizCompleted = true;
        },
        incrementTimer(state) {
            state.timer += 1;
        },
        resetQuiz(state) {
            state.questionId = 0;
            state.answered = false;
            state.answeredArr = [];
            state.quizCompleted = false;
            state.timer = 0;
        },
    },
})

export const { setAnswered, nextQuestion, completeQuiz, incrementTimer, resetQuiz } = quizSlice.actions

export default quizSlice
