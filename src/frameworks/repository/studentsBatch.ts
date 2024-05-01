import { StudentBatch_Model } from "../../entity/models/studentBatch";
import { StudentBatchRepository } from "../../entity/repository/StudentBatchRepository";
import mongoose from "mongoose";
import studentBatchModel from "../models/studentsBatch";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";

export class Mongo_StudentBatchAdapter implements StudentBatchRepository{
    constructor(
        private indexRepo: SerialNumbersRepository,
    ){

    }
    async createStudentBatch(data: StudentBatch_Model): Promise<void | StudentBatch_Model> {
        const {batchId} = data
        let tempbatchID =   {}
        !batchId.length? tempbatchID  = await this.indexRepo.getIndex({collectionName:'studentsBatch'}) :''
        const batch =await studentBatchModel.findOneAndUpdate({tempbatchID,deleted:false},{$set:data},{upsert:true})   
        console.log(batch)
    }
    async deleteStudentBatch(data: { batchid: string; }): Promise< void | StudentBatch_Model> {
        const {batchid} = data
        let tempbatchID =   {}
        !batchid.length? tempbatchID  = await this.indexRepo.getIndex({collectionName:'studentsBatch'}) :''
        const batch =await studentBatchModel.findOneAndUpdate({batchid},{$set:{deleted:true}},{upsert:true}) as StudentBatch_Model  
        console.log(batch)
        return batch
    }
    async readStudentBatchById(data:{batchid:string}):Promise<StudentBatch_Model|void>{
        const batch =await studentBatchModel.findOne({deleted:false,batchId:data.batchid}) as StudentBatch_Model  
        console.log(batch)  
        return batch
    }
    async readAllStudentBatch(): Promise<void | StudentBatch_Model[]> {
        const batch =await studentBatchModel.find({deleted:false})   
        console.log(batch)  
        return batch
    }
     
}