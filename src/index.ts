import { toolKit } from './util/ToolKit';
import { DiagnosticReportFactory } from './util/factories/DiagnosticReportFactory';
import { FeedbackReportFactory } from './util/factories/FeedbackReportFactory';
import { ProgressReportFactory } from './util/factories/ProgressReportFactory';
import * as readline from 'readline';

const { students, studentResponses, assessments, questions } = toolKit.getData();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question('Please enter the Student ID: ', (studentId) => {
        // Check if the student ID exists
        if (!students.find(student => student.id === studentId)) {
            console.log('Student does not exist');
            promptUser(); // Prompt the user again
            return;
        }
        rl.question('Report to generate (1 for Diagnostic, 2 for Progress, 3 for Feedback): ', (reportId) => {

            switch (parseInt(reportId)) {
                case 1:
                    const studentDiagnosticReportFactory = new DiagnosticReportFactory(studentId, students, studentResponses, assessments, questions);  
                    console.log(studentDiagnosticReportFactory.getReport());
                    break;
                case 2:
                    const studentProgressReportFactory = new ProgressReportFactory(studentId, students, studentResponses, assessments, questions);
                    console.log(studentProgressReportFactory.getReport());
                    break;
                case 3:
                    const studentFeedbackReportFactory = new FeedbackReportFactory(studentId, students, studentResponses, assessments, questions);
                    console.log(studentFeedbackReportFactory.getReport());
                    break;
                default:
                    console.log('Invalid report ID');
                    break;
            }
            promptUser(); // Prompt the user again
        });
    });
}

promptUser(); // Initial prompt
