
import { toolKit } from './util/ToolKit';
import { DiagnosticReportFactory } from './util/factories/DiagnosticReportFactory';

const { students, studentResponses, assessments, questions } = toolKit.getData();



const studentId  = 'student1';
const reportId = 1;

switch (reportId) {
    case 1:
        const studentDiagnosticReport = new DiagnosticReportFactory(studentId, students, studentResponses, assessments, questions);  
            
        console.log(studentDiagnosticReport.getReport());
        break;
    
}
