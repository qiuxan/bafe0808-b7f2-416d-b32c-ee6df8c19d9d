import { Assessment } from "../../model/Assessment.interface";
import { Question } from "../../model/Question.interface";
import { Student } from "../../model/Student.interface";
import { StudentResponse, Response } from "../../model/StudentResponse.interface";

export class StudentReportFactory {
    protected _students: Student[];
    protected _allStudentsResponses: StudentResponse[];
    protected _assessments: Assessment[];
    protected _questions: Question[];

    constructor(students: Student[], allStudentsResponses: StudentResponse[], assessments: Assessment[], questions: Question[]) {
        this._students = students;
        this._allStudentsResponses = allStudentsResponses;
        this._assessments = assessments;
        this._questions = questions;
    }    
}

