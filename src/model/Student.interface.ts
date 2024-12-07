export interface Student {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  yearLevel: number;
  getFullName: () => string;
}
