import { StudentBatch_Model } from "../models/studentBatch"  

export interface StudentBatchRepository{
    createStudentBatch(data:StudentBatch_Model):Promise<StudentBatch_Model|void>
    deleteStudentBatch(data:{batchid:string}):Promise<StudentBatch_Model|void>
    readStudentBatchById(data:{batchid:string}):Promise<StudentBatch_Model|void>
    readAllStudentBatch():Promise<StudentBatch_Model[]|void>
} 