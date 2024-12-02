interface Question {
    questionId: string;
    position: number;
}

interface Assessment {
    id: string;
    name: string;
    questions: Question[];
}

export { Assessment, Question };
