import { Student } from "../model/Student.interface";

export const GET_FULL_NAME = function(this: Student) {
    return `${this.firstName} ${this.middleName ? this.middleName + ' ' : ''}${this.lastName}`;
};