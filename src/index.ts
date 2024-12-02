import * as fs from 'fs';
import * as path from 'path';

const readJsonFile = (filePath: string) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const studentsFilePath = path.join(__dirname, '../data/students.json');
const studentResponsesFilePath = path.join(__dirname, '../data/student-responses.json');
const assessmentsFilePath = path.join(__dirname, '../data/assessments.json');
const questionsFilePath = path.join(__dirname, '../data/questions.json');

const students = readJsonFile(studentsFilePath);
const studentResponses = readJsonFile(studentResponsesFilePath);
const assessments = readJsonFile(assessmentsFilePath);
const questions = readJsonFile(questionsFilePath);

console.log( {students});
console.log({studentResponses});
console.log({assessments});
console.log({ questions });