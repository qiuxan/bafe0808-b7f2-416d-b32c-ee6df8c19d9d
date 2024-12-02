interface Student {
  id: string;
  yearLevel: number;
}

export interface Response {
  questionId: string;
  response: string;
}

interface Results {
  rawScore: number;
}

export interface StudentResponse {
  id: string;
  assessmentId: string;
  assigned: string;
  started?: string;
  completed?: string;
  student: Student;
  responses: Response[];
  results: Results;
}
