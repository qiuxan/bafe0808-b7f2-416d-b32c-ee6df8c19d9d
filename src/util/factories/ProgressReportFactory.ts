import { StudentReportFactory } from "./StudentReportFactory";
import { Student } from "../../model/Student.interface";
import { StudentResponse } from "../../model/StudentResponse.interface";
import { Assessment } from "../../model/Assessment.interface";
import { Question } from "../../model/Question.interface";
import { ProgressReportDTO,CompletedAssessment } from "../../model/DTO/ProgressReportDTO.interface";
import { toolKit } from "../ToolKit";

export class ProgressReportFactory extends StudentReportFactory {
    private _studentId: string;
    private _student!: Student;
    private _progressReportDTO:ProgressReportDTO
    private _completedAssessments: CompletedAssessment[];
    private _studentResponses!: StudentResponse[];
    private _improvement!: number;
    private _report!: string;

    constructor(studentId: string,students: Student[], allStudentsResponses: StudentResponse[], assessments: Assessment[], questions: Question[]) {
        super(students, allStudentsResponses, assessments, questions);
        this._studentId = studentId;

        this._progressReportDTO = {
            userFullName: '',
            totalTestNumber: 0,
            completedAssessments: [],
            improvement: 0
        };

        this._completedAssessments = [];

        this.setStudentDataById()
            .setStudentResponses()
            .setCompletedAssessments()
            .setImprovement()
            .setProgressReportDTO()
            .setReport();
    }

    public getReport(): string {
        return this._report;
    }

    private setStudentDataById(): ProgressReportFactory {
        this._student = this._students.find(student => student.id === this._studentId) as Student;
        return this;
    }

    private setStudentResponses(): ProgressReportFactory {
        this._studentResponses = this._allStudentsResponses.filter(response => response.student.id === this._studentId);
        return this;
    }

    private setCompletedAssessments(): ProgressReportFactory {

        let completedAssessmentToStore: CompletedAssessment;
        this._studentResponses.forEach(response => {

            if(!response.completed){ // for progress report we need to check if the response is completed
                return;
            }

            const assignedDate = toolKit.formatDate(response.assigned, false);

            completedAssessmentToStore = {
                date: assignedDate,
                rawScore: response.results.rawScore,
                totalQuestions: response.responses.length
            };

            this._completedAssessments.push(completedAssessmentToStore);
        });
    
        return this;
    }

    private setImprovement(): ProgressReportFactory {
        const firstAssessment = this._completedAssessments[0];
        const lastAssessment = this._completedAssessments[this._completedAssessments.length - 1];

        this._improvement = lastAssessment.rawScore - firstAssessment.rawScore;
        return this;
    }

    private setProgressReportDTO(): ProgressReportFactory {
        this._progressReportDTO = {
            userFullName: this._student.getFullName(),
            totalTestNumber: this._completedAssessments.length,
            completedAssessments: this._completedAssessments,
            improvement: this._improvement
        };
        return this;
    }

    private setReport(): ProgressReportFactory {
        const {userFullName, completedAssessments, improvement } = this._progressReportDTO;
        let report = `${userFullName} has completed Numeracy assessment ${completedAssessments.length} times in total. Date and raw score given below:\n\n`;

        completedAssessments.forEach(assessment => {
            report += `Date: ${assessment.date}, Raw Score: ${assessment.rawScore} out of ${assessment.totalQuestions}\n`;
        });

        let conclustionSentence;
        if(improvement > 0){
            conclustionSentence = `\n${userFullName} got ${improvement} more correct in the recent completed assessment than the oldest`;
        }  
        if(improvement < 0){
            conclustionSentence  = `\n${userFullName} got ${Math.abs(improvement)} less correct in the recent completed assessment than the oldest`;
        }  
        if(improvement === 0){
            conclustionSentence = `\n${userFullName} got the same number of correct answers in the recent completed assessment as the oldest`;
        }

        report += conclustionSentence;

        this._report = report;
        return this;
    }
}
