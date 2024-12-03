import { Assessment } from "../../model/Assessment.interface";
import { StrandDetail, DiagnosticReportDTO } from "../../model/DTO/DiagnosticReportDTO.interface";
import { Question } from "../../model/Question.interface";
import { Student } from "../../model/Student.interface";
import { StudentResponse } from "../../model/StudentResponse.interface";
import { toolKit } from "../ToolKit";
import { StudentReportFactory } from "./StudentReportFactory";

export class DiagnosticReportFactory extends StudentReportFactory {
    private _studentId!: string;
    private _student!: Student;
    private _currentStudentResponses!: StudentResponse[];
    private _studentResponseWithLargestYearLevel!: StudentResponse;
    private _strandDetails!: StrandDetail[];
    private _recentCompleteTime!: string;
    private _DiagnosticReportDTO!: DiagnosticReportDTO;
    private _assessmentName!: string;
    private _totalQuestions!: number;
    private _correctAnswers!: number;

    private _report!:string;

    constructor(studentId: string, students: Student[], allStudentsResponses: StudentResponse[], assessments: Assessment[], questions: Question[]) {
        super(students, allStudentsResponses, assessments, questions);

        this._totalQuestions = 0;
        this._correctAnswers = 0;

        this._strandDetails = [
            { strandName: 'Number and Algebra', correct: 0, total: 0 },
            { strandName: 'Measurement and Geometry', correct: 0, total: 0 },
            { strandName: 'Statistics and Probability', correct: 0, total: 0 },
        ];

        this._DiagnosticReportDTO = {
            userFirstName: '',
            userLastName: '',
            LastCompletedAssessment: '',
            LastCompletedAssessmenttDate: '',
            totalQuestions: 0,
            correctAnswers: 0,
            strands: []
        };

        this.setStudentDataById(studentId)
            .setStudent()
            .setCurrentStudentResponsesByStudentId()
            .setStudentResponseWithLargestYearLevel()
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

        const completedDate = this._studentResponseWithLargestYearLevel.completed || '';
        const dateToStore = toolKit.formatDate(completedDate);
        this._recentCompleteTime = dateToStore;
        return this;
    }

    private setAssessmentName():DiagnosticReportFactory{
        this._assessmentName = this._assessments.find(assessment => assessment.id === this._studentResponseWithLargestYearLevel.assessmentId)!.name;
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

    private setStudentResponseWithLargestYearLevel(): DiagnosticReportFactory {
        this._studentResponseWithLargestYearLevel = this._currentStudentResponses.reduce((prev, current) => {
            return (prev.student.yearLevel > current.student.yearLevel) ? prev : current;
        });
        return this;
    }

    private setStrandDetails(): DiagnosticReportFactory {

        this._questions.forEach(question => {

            // Don't have to do this forEach, if the response order can be sorted by questionId. Just to play safe. 
            this._studentResponseWithLargestYearLevel.responses.forEach(response => { 
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
            userFirstName: this._student.firstName,
            userLastName: this._student.lastName,
            LastCompletedAssessment: this._assessmentName,
            LastCompletedAssessmenttDate: this._recentCompleteTime,
            totalQuestions: this._totalQuestions,
            correctAnswers: this._correctAnswers,
            strands: this._strandDetails
        };
        return this;
    }

    private setReport(): DiagnosticReportFactory {
        const { userFirstName, userLastName, LastCompletedAssessment, LastCompletedAssessmenttDate, totalQuestions, correctAnswers, strands } = this._DiagnosticReportDTO;
        let report = `${userFirstName} ${userLastName} recently completed ${LastCompletedAssessment} assessment on ${LastCompletedAssessmenttDate}\n`;
        report += `He got ${correctAnswers} questions right out of ${totalQuestions}. Details by strand given below:\n\n`;
    
        strands.forEach((strand: StrandDetail) => {
            report += `${strand.strandName}: ${strand.correct} out of ${strand.total} correct\n`;
        });

        this._report = report;
        return this;
    }
 
}
