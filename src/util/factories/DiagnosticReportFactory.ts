import { Assessment } from "../../model/Assessment.interface";
import { StrandDetail, DiagnosticReportDTO } from "../../model/DTO/DiagnosticReportDTO.interface";
import { Question } from "../../model/Question.interface";
import { Student } from "../../model/Student.interface";
import { StudentResponse } from "../../model/StudentResponse.interface";
import { toolKit } from "../ToolKit";
import { StudentReportFactory } from "./StudentReportFactory";
import {STRAND_NAMES} from "../../constants/StrandNames";

export class DiagnosticReportFactory extends StudentReportFactory {
    protected _studentId!: string;
    protected _student!: Student;
    protected _currentStudentResponses!: StudentResponse[];
    protected _studentLastCompletedResponse!: StudentResponse;
    protected _strandDetails!: StrandDetail[];
    protected _recentCompleteTime!: string;
    protected _DiagnosticReportDTO!: DiagnosticReportDTO;
    protected _assessmentName!: string;
    protected _totalQuestions!: number;
    protected _correctAnswers!: number;

    private _report!:string;

    constructor(studentId: string, students: Student[], allStudentsResponses: StudentResponse[], assessments: Assessment[], questions: Question[]) {
        super(students, allStudentsResponses, assessments, questions);

        this._totalQuestions = 0;
        this._correctAnswers = 0;

        this._strandDetails = STRAND_NAMES.map((strandName: typeof STRAND_NAMES[number]) => ({ strandName, correct: 0, total: 0 })); // Explicitly type strandName

        this._DiagnosticReportDTO = {
            userFullName: '',
            LastCompletedAssessment: '',
            LastCompletedAssessmenttDate: '',
            totalQuestions: 0,
            correctAnswers: 0,
            strands: []
        };

        this.setStudentDataById(studentId)
            .setStudent()
            .setCurrentStudentResponsesByStudentId()
            .setStudentLastCompletedResponse()
            .setRecentCompleteTime()
            .setAssessmentName()
            .setStrandDetails()
            .setTotalQuestions()
            .setCorrectAnswers()
            .setDiagnosticReportDTO()
            .setReport();

    }

    public getReport(): string {
        return this._report;
    }

    private setRecentCompleteTime():DiagnosticReportFactory{

        const completedDate = this._studentLastCompletedResponse.completed || '';
        const dateToStore = toolKit.formatDate(completedDate);
        this._recentCompleteTime = dateToStore;
        return this;
    }

    private setAssessmentName():DiagnosticReportFactory{
        this._assessmentName = this._assessments.find(assessment => assessment.id === this._studentLastCompletedResponse.assessmentId)!.name;
        return this;
    };

    private setStudent():DiagnosticReportFactory{
        this._student = this._students.find(student => student.id === this._studentId)!;
        return this;
    };

    private setStudentDataById(studentId: string): DiagnosticReportFactory {
        this._studentId = studentId;
        return this;
    }

    private setCurrentStudentResponsesByStudentId(): DiagnosticReportFactory {
        this._currentStudentResponses = this._allStudentsResponses.filter(studentResponse => studentResponse.student.id === this._studentId);
        return this;
    }

    private setStudentLastCompletedResponse(): DiagnosticReportFactory {

        let theLatesetCompletedResponse:StudentResponse = this._currentStudentResponses[0];
       
        this._currentStudentResponses.forEach(response => {
            if(response.completed){
                theLatesetCompletedResponse = response;
            }
        });

        this._studentLastCompletedResponse = theLatesetCompletedResponse;
        return this;
    }

    private setStrandDetails(): DiagnosticReportFactory {

        this._questions.forEach(question => {

            // Don't have to do this forEach, if the response order can be sorted by questionId. Just to play safe. 
            this._studentLastCompletedResponse.responses.forEach(response => { 
                if (response.questionId === question.id) {
                    const correctAnswer = question.config.key;
                    if (correctAnswer) {
                        const strand = question.strand;
                        const strandDetail = this._strandDetails.find(strandDetail => strandDetail.strandName === strand);
                        if (strandDetail) {
                            strandDetail.total += 1;
                            if (correctAnswer === response.response) {
                                strandDetail.correct += 1;
                            }
                        }
                    }
                }
            });
            
        });

     
        return this;
    }

    // Set the total number and correct number directly to the DTO is fine, 
    //but setting them in the class properties first and then set them to the DTO will make the code more maintainable.

    private setTotalQuestions(): DiagnosticReportFactory {
        this._totalQuestions = this._questions.length;
        return this;
    }

    private setCorrectAnswers(): DiagnosticReportFactory {
        this._strandDetails.forEach(strand => {
            this._correctAnswers += strand.correct;
        });        
        return this;
    }

    private setDiagnosticReportDTO(): DiagnosticReportFactory {
        this._DiagnosticReportDTO = {
            userFullName: this._student.getFullName(),
            LastCompletedAssessment: this._assessmentName,
            LastCompletedAssessmenttDate: this._recentCompleteTime,
            totalQuestions: this._totalQuestions,
            correctAnswers: this._correctAnswers,
            strands: this._strandDetails
        };
        return this;
    }

    private setReport(): DiagnosticReportFactory {
        const { userFullName, LastCompletedAssessment, LastCompletedAssessmenttDate, totalQuestions, correctAnswers, strands } = this._DiagnosticReportDTO;
        let report = `${userFullName} recently completed ${LastCompletedAssessment} assessment on ${LastCompletedAssessmenttDate}\n`;
        report += `He got ${correctAnswers} questions right out of ${totalQuestions}. Details by strand given below:\n\n`;
    
        strands.forEach((strand: StrandDetail) => {
            report += `${strand.strandName}: ${strand.correct} out of ${strand.total} correct\n`;
        });

        this._report = report;
        return this;
    }
 
}
