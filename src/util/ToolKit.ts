import * as fs from 'fs';
import * as path from 'path';
import { Question } from '../model/Question.interface';
import { Student } from '../model/Student.interface';
import { Assessment } from '../model/Assessment.interface';
import { StudentResponse } from '../model/StudentResponse.interface';

interface ToolKit{
    readJsonFile: (filePath: string) => object;
    getData: () => {
        students: Student[];
        studentResponses: StudentResponse[];
        assessments: Assessment[];
        questions: Question[];
    };
    
    formatDate: (date: string, withTime?:boolean ) => string;
    getDaySuffix: (day: number) => string;
    formatTime: (hours: number, minutes: number) => string;
};



export const toolKit: ToolKit = {
    readJsonFile : (filePath: string) => {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    },

    getData : () => {
        const studentsFilePath = path.join(__dirname, '../../data/students.json');
        const studentResponsesFilePath = path.join(__dirname, '../../data/student-responses.json');
        const assessmentsFilePath = path.join(__dirname, '../../data/assessments.json');
        const questionsFilePath = path.join(__dirname, '../../data/questions.json');
    
        const students: Student[] = toolKit.readJsonFile(studentsFilePath) as Student[];
        const studentResponses: StudentResponse[] = toolKit.readJsonFile(studentResponsesFilePath) as StudentResponse[];
        const assessments: Assessment[] = toolKit.readJsonFile(assessmentsFilePath) as Assessment[];
        const questions: Question[] = toolKit.readJsonFile(questionsFilePath) as Question[];
    
        return {
            students,
            studentResponses,
            assessments,
            questions,
        };
    },

    formatDate: (dateString: string, withTime: boolean = true) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        const [day, month, yearAndTime] = dateString.split('/');
        const [year, time] = yearAndTime.split(' ');
        const [hours, minutes, seconds] = time.split(':');
    
        const daySuffix = toolKit.getDaySuffix(parseInt(day));
        const monthName = months[parseInt(month) - 1];

        let formattedTime ='';

        if(withTime){
            formattedTime = ' '+toolKit.formatTime(parseInt(hours), parseInt(minutes));
        }
        return `${parseInt(day)}${daySuffix} ${monthName} ${year}${formattedTime}`;
    },

    getDaySuffix(day: number): string {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    },

    formatTime(hours: number, minutes: number): string {
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }


};



