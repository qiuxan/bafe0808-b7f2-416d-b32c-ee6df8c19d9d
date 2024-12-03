import { toolKit } from '../util/ToolKit';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

describe('toolKit', () => {
    describe('readJsonFile', () => {
        it('should read and parse JSON file', () => {
            const filePath = 'test.json';
            const fileContent = '{"key": "value"}';
            (fs.readFileSync as jest.Mock).mockReturnValue(fileContent);

            const result = toolKit.readJsonFile(filePath);
            expect(result).toEqual({ key: 'value' });
            expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf8');
        });
    });

    describe('getData', () => {
        it('should get data from JSON files', () => {
            const students = [{ id: 1, name: 'John Doe' }];
            const studentResponses = [{ studentId: 1, response: 'A' }];
            const assessments = [{ id: 1, title: 'Math Test' }];
            const questions = [{ id: 1, question: 'What is 2+2?' }];

            jest.spyOn(toolKit, 'readJsonFile')
                .mockImplementation((filePath) => {
                    switch (filePath) {
                        case path.join(__dirname, '../../data/students.json'):
                            return students;
                        case path.join(__dirname, '../../data/student-responses.json'):
                            return studentResponses;
                        case path.join(__dirname, '../../data/assessments.json'):
                            return assessments;
                        case path.join(__dirname, '../../data/questions.json'):
                            return questions;
                        default:
                            return {};
                    }
                });

            const data = toolKit.getData();
            expect(data).toEqual({ students, studentResponses, assessments, questions });
        });
    });

    describe('formatDate', () => {
        it('should format date without time', () => {
            const date = '12/05/2023 14:30:00';
            const formattedDate = toolKit.formatDate(date, false);
            expect(formattedDate).toBe('12th May 2023');
        });

        it('should format date with time', () => {
            const date = '12/05/2023 14:30:00';
            const formattedDate = toolKit.formatDate(date, true);
            expect(formattedDate).toBe('12th May 2023 2:30 PM');
        });
    });

});
