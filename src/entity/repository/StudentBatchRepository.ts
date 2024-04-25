import { StudentBatch } from "../models/studentBatch" 

export interface StudentBatchRepository{
    createStudentBatch(data:StudentBatch):Promise<StudentBatch|void>
    editStudentBatch(data:StudentBatch):Promise<StudentBatch|void>
    deleteStudentBatch(data:{batchid:string}):Promise<StudentBatch|void>
    readStudentBatch(data:{batchid:string}):Promise<StudentBatch|void>
    readAllStudentBatch():Promise<StudentBatch[]|void>
} 