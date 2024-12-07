import { Assessment } from "../../model/Assessment.interface";
import { Answer, FeedbackReportDTO, WrongAnswerFeedback } from "../../model/DTO/FeedbackReportDTO.interface";
import { Question } from "../../model/Question.interface";
import { Student } from "../../model/Student.interface";
import { StudentResponse } from "../../model/StudentResponse.interface";
import { DiagnosticReportFactory } from "./DiagnosticReportFactory";

export class FeedbackReportFactory extends DiagnosticReportFactory {
    // in a real life scenario, I will combine the DiagnosticReportFactory and FeedbackReportFactory but this is to show my understand of the use of inheritance of classes
    private _FeedbackReportDTO:FeedbackReportDTO;
    private _feebacks: WrongAnswerFeedback[];
    private _feedbackReport!:string;

    constructor(studentId: string, students: Student[], allStudentsResponses: StudentResponse[], assessments: Assessment[], questions: Question[]) {
        super(studentId,students, allStudentsResponses, assessments, questions);

        this._FeedbackReportDTO = {
            userFullName: '',
            assessmentType: '',
            completionDate: '',
            correctAnswers: 0,
            totalQuestions: 0,
            feedback: []
        }
        this._feebacks = [];

        this.setFeedbacks()
            .setFeedbackReportDTO()
            .setFeedbackReport();
    }

    public getReport(): string { // orverride the getReport method so this class will not have access to the DiagnosticReportFactory report
        return this._feedbackReport;
    }
    private setFeedbacks(): FeedbackReportFactory {
        const responsesToCheck = this._studentLastCompletedResponse.responses;
        this._questions.forEach((question) => {

            responsesToCheck.forEach((response) => {
                if(response.questionId === question.id && response.response !== question.config.key) {
                    const givenOptions = question.config.options;

                    const studentChoose = givenOptions.find((option) => option.id === response.response);
                    const correctAnswer = givenOptions.find((option) => option.id === question.config.key);
                    
                    if (studentChoose && correctAnswer) {
                        const yourAnswer: Answer = {label: studentChoose.label, value: studentChoose.value};
                        const rightAnswer: Answer = {label: correctAnswer.label, value: correctAnswer.value};

                        this._feebacks.push({
                            question: question.stem,
                            yourAnswer,
                            rightAnswer,
                            hint: question.config.hint
                        })
                    }
                }
            });
        });
        return this;
    }
    private setFeedbackReportDTO(): FeedbackReportFactory {
        this._FeedbackReportDTO.userFullName = this._student.getFullName();
        this._FeedbackReportDTO.assessmentType = this._assessmentName;
        this._FeedbackReportDTO.completionDate = this._recentCompleteTime;
        this._FeedbackReportDTO.correctAnswers = this._correctAnswers;
        this._FeedbackReportDTO.totalQuestions = this._totalQuestions;
        this._FeedbackReportDTO.feedback = this._feebacks;
        return this;
    }
    private setFeedbackReport(): FeedbackReportFactory {
        const { userFullName, assessmentType, completionDate, correctAnswers, totalQuestions } = this._FeedbackReportDTO;
        const feedbackDetails = this._feebacks.map(feedback => [
            `Question: ${feedback.question}`,
            `Your answer: ${feedback.yourAnswer.label} with value ${feedback.yourAnswer.value}`,
            `Right answer: ${feedback.rightAnswer.label} with value ${feedback.rightAnswer.value}`,
            `Hint: ${feedback.hint}`
        ].join('\n'));

        this._feedbackReport = [
            `${userFullName} recently completed ${assessmentType} assessment on ${completionDate}`,
            `He got ${correctAnswers} questions right out of ${totalQuestions}. Feedback for wrong answers given below`,
            ...feedbackDetails
        ].join('\n\n');

        return this;
    }
    
}
