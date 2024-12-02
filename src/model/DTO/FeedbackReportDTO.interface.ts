export interface FeedbackReportDTO {
    candidateFirstName: string;
    candidateLastName: string;

    assessmentType: string;

    completionDate: string;

    correctAnswers: number;
    totalQuestions: number;

    feedback: WrongAnswerFeedback[];
}

export interface WrongAnswerFeedback {
    question: string;
    yourAnswer: Answer;
    rightAnswer: Answer;
    hint: string;
}

export interface Answer {
    label: string;
    value: string;
}
