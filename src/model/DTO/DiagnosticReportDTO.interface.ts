export interface DiagnosticReportDTO {
    userFirstName: string;
    userLastName: string;
    LastCompletedAssessment: string;
    LastCompletedAssessmenttDate: string;
    totalQuestions: number;
    correctAnswers: number;
    strands: StrandDetail[];
}

export interface StrandDetail {
    strandName: 'Statistics and Probability'| 'Number and Algebra' | 'Measurement and Geometry';
    correct: number;
    total: number;
}
