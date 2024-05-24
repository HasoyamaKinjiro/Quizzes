export interface Answer {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    question: string;
    answers: Answer[];
}

export interface Quiz {
    id: string | number;
    title: string;
    questions: Question[];
}
