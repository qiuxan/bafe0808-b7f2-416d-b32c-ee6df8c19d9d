export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  yearLevel: number;
  getFullName: () => string;
}
