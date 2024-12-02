export interface Assessment {
    date: string;
    rawScore: number;
    totalQuestions: number;
}

export interface ProgressReportDTO {
    name: string;
    assessments: Assessment[];
    improvement: string;
}
