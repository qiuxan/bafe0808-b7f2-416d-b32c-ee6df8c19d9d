
import { toolKit } from './util/ToolKit';
import { DiagnosticReportFactory } from './util/factories/DiagnosticReportFactory';
import { FeedbackReportFactory } from './util/factories/FeedbackReportFactory';
import { ProgressReportFactory } from './util/factories/ProgressReportFactory';

const { students, studentResponses, assessments, questions } = toolKit.getData();



const studentId  = 'student2';
const reportId: number = 1;

switch (reportId) {
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
    
}
