import { studentBatch } from "../models/studentBatch";

export interface studentBatchesRepo{
    createStudentBatch(data:studentBatch):Promise<studentBatch|void>
    editStudentBatch(data:studentBatch):Promise<studentBatch|void>
    deleteStudentBatch(data:{batchid:string}):Promise<studentBatch|void>
    readStudentBatch(data:{batchid:string}):Promise<studentBatch|void>
    readAllStudentBatch():Promise<studentBatch[]|void>
}