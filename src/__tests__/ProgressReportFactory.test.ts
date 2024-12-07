
import { ProgressReportFactory } from '../util/factories/ProgressReportFactory';
import { Student } from '../model/Student.interface';
import { StudentResponse } from '../model/StudentResponse.interface';
import { Assessment } from '../model/Assessment.interface';
import { Question } from '../model/Question.interface';
import { GET_FULL_NAME } from '../constants/Functions';

describe('ProgressReportFactory', () => {
    let students: Student[];
    let allStudentsResponses: StudentResponse[];
    let assessments: Assessment[];
    let questions: Question[];

    beforeEach(() => {
        students = [
            {
                id: '1', firstName: 'John', lastName: 'Doe',
                yearLevel: 5,
                getFullName:GET_FULL_NAME

            },
        ];

        allStudentsResponses = [
            {
                student: { id: '1', yearLevel: 5 },
                assessmentId: 'a1',
                assigned: "14/12/2019 10:31:00",
                started: "16/12/2019 10:00:00",
                completed: "16/12/2019 10:46:00",
                responses: [
                    { questionId: 'q1', response: 'A' },
                    // ...other responses...
                ],
                id: '',
                results: {
                    rawScore: 1
                }
            },
            {
                student: { id: '1', yearLevel: 5 },
                assessmentId: 'a2',
                assigned: "20/12/2019 10:31:00",
                started: "22/12/2019 10:00:00",
                completed: "22/12/2019 10:46:00",
                responses: [
                    { questionId: 'q1', response: 'A' },
                    { questionId: 'q1', response: 'A' },
                    { questionId: 'q1', response: 'A' },
                    // ...other responses...
                ],
                id: '',
                results: {
                    rawScore: 2
                }
            },
            // ...other student responses...
        ];

        assessments = [
            {
                id: 'a1', name: 'Math Assessment',
                questions: []
            },
            {
                id: 'a2', name: 'Math Assessment 2',
                questions: []
            },
            // ...other assessments...
        ];

        questions = [
            {
                id: 'q1', strand: 'Number and Algebra',
                config: {
                    key: 'A',
                    options: [
                        { id: 'A', label: 'option 1', value: '1' },
    
                    ],
                    hint: 'hint 1',
                },
                stem: 'question 1',
                type: ''
            },
        ];
    });

    it('should generate a correct progress report', () => {
        const factory = new ProgressReportFactory('1', students, allStudentsResponses, assessments, questions);
        const report = factory.getReport();

        expect(report).toContain('John Doe has completed Numeracy assessment 2 times in total.');
        expect(report).toContain('Date: 14th December 2019, Raw Score: 1 out of 1');
        expect(report).toContain('Date: 20th December 2019, Raw Score: 2 out of 3');
        expect(report).toContain('John Doe got 1 more correct in the recent completed assessment than the oldest');
    });
});