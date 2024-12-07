export interface CompletedAssessment {
    date: string;
    rawScore: number;
    totalQuestions: number;
}

export interface ProgressReportDTO {
    userFullName: string;
    totalTestNumber: number;
    completedAssessments: CompletedAssessment[];
    improvement: number;
}
