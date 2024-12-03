
import { DiagnosticReportFactory } from '../util/factories/DiagnosticReportFactory';
import { Student } from '../model/Student.interface';
import { StudentResponse } from '../model/StudentResponse.interface';
import { Assessment } from '../model/Assessment.interface';
import { Question } from '../model/Question.interface';

describe('DiagnosticReportFactory', () => {
    let students: Student[];
    let allStudentsResponses: StudentResponse[];
    let assessments: Assessment[];
    let questions: Question[];

    beforeEach(() => {
        students = [
            {
                id: '1', firstName: 'John', lastName: 'Doe',
                yearLevel: 5
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
            // ...other student responses...
        ];

        assessments = [
            {
                id: 'a1', name: 'Math Assessment',
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

    it('should generate a correct diagnostic report', () => {
        const factory = new DiagnosticReportFactory('1', students, allStudentsResponses, assessments, questions);
        const report = factory.getReport();

        expect(report).toContain('John Doe recently completed Math Assessment assessment on 16th December 2019 10:46 AM');
        expect(report).toContain('He got 1 questions right out of 1');
        expect(report).toContain('Number and Algebra: 1 out of 1 correct');
    });
});