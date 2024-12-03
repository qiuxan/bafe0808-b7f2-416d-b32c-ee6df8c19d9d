
import { FeedbackReportFactory } from '../util/factories/FeedbackReportFactory';
import { Student } from '../model/Student.interface';
import { StudentResponse } from '../model/StudentResponse.interface';
import { Assessment } from '../model/Assessment.interface';
import { Question } from '../model/Question.interface';

describe('FeedbackReportFactory', () => {
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
                    { questionId: 'q1', response: 'B' },
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
                        { id: 'B', label: 'option 2', value: '2' },
                    ],
                    hint: 'hint 1',
                },
                stem: 'question 1',
                type: ''
            },
        ];
    });

    it('should generate a correct feedback report', () => {
        const factory = new FeedbackReportFactory('1', students, allStudentsResponses, assessments, questions);
        const report = factory.getReport();

        expect(report).toContain('John Doe recently completed Math Assessment assessment on 16th December 2019 10:46 AM');
        expect(report).toContain('He got 0 questions right out of 1. Feedback for wrong answers given below');
        expect(report).toContain('Question: question 1');
        expect(report).toContain('Your answer: option 2 with value 2');
        expect(report).toContain('Right answer: option 1 with value 1');
        expect(report).toContain('Hint: hint 1');
    });
});