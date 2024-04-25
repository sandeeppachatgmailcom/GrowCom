import { StudentBatch_Model } from "../Models/StudentBatch"  

export interface StudentBatchRepository{
    createStudentBatch(data:StudentBatch_Model):Promise<StudentBatch_Model|void>
    editStudentBatch(data:StudentBatch_Model):Promise<StudentBatch_Model|void>
    deleteStudentBatch(data:{batchid:string}):Promise<StudentBatch_Model|void>
    readStudentBatch(data:{batchid:string}):Promise<StudentBatch_Model|void>
    readAllStudentBatch():Promise<StudentBatch_Model[]|void>
} 