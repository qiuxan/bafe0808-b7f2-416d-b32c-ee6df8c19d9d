import { STRAND_NAMES } from "../../constants/StrandNames"; // Add this import

export interface DiagnosticReportDTO {
    userFullName: string;
    LastCompletedAssessment: string;
    LastCompletedAssessmenttDate: string;
    totalQuestions: number;
    correctAnswers: number;
    strands: StrandDetail[];
}

export interface StrandDetail {
    strandName: typeof STRAND_NAMES[number]; // Use the constant array type
    correct: number;
    total: number;
}
