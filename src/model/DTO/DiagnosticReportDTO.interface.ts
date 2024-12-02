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
    strandName: string;
    correct: number;
    total: number;
}
