import * as fs from 'fs';
import * as path from 'path';
import { Question } from './model/Question.interface';
import { Student } from './model/Student.interface';
import { Assessment } from './model/Assessment.interface';
import { StudentResponse } from './model/StudentResponse.interface';

const readJsonFile = (filePath: string) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const studentsFilePath = path.join(__dirname, '../data/students.json');
const studentResponsesFilePath = path.join(__dirname, '../data/student-responses.json');
const assessmentsFilePath = path.join(__dirname, '../data/assessments.json');
const questionsFilePath = path.join(__dirname, '../data/questions.json');

const students: Student[] = readJsonFile(studentsFilePath);
const studentResponses: StudentResponse[] = readJsonFile(studentResponsesFilePath);
const assessments: Assessment[] = readJsonFile(assessmentsFilePath);
const questions: Question[] = readJsonFile(questionsFilePath);

console.log({ students });
console.log({ studentResponses });
console.log({ assessments });
console.log({ questions });