export interface CompletedAssessment {
    date: string;
    rawScore: number;
    totalQuestions: number;
}

export interface ProgressReportDTO {
    userFirstName: string;
    userLastName: string;
    totalTestNumber: number;
    completedAssessments: CompletedAssessment[];
    improvement: number;
}
