import { StudentBatch_Model } from "../../entity/models/studentBatchModel";
import { StudentBatchRepository } from "../../entity/repository/StudentBatchRepository";
import mongoose from "mongoose";
import studentBatchModel from "../models/studentsBatch";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import { FailedStatus_reply } from "../../entity/Types/failedStatus";

export class Mongo_StudentBatchAdapter implements StudentBatchRepository{
    constructor(
        private indexRepo: SerialNumbersRepository,
    ){

    }
    async createStudentBatch(data: StudentBatch_Model): Promise<void | StudentBatch_Model & FailedStatus_reply> {
        let {batchId,BatchType , batchName, location, maxCapacity,trainer} = data
        
        let tempbatchID =   {}
        
        if(!batchId.length){
            const existing = await studentBatchModel.findOne({batchName:data.batchName,deleted:false})
            if(existing && existing.batchId!==batchId){
                return {...JSON.parse(JSON.stringify(existing)),status:false,message:'record already exist in the same name'}
            }  
            else{
                tempbatchID  = await this.indexRepo.getIndex({collectionName:'studentsBatch'})
                tempbatchID?.active as boolean? batchId = JSON.parse(JSON.stringify(tempbatchID))?.serialNumber:''
                data.batchId = batchId
                const batch = await studentBatchModel.updateOne({batchId:batchId},{$set:data},{upsert:true})   
                const result = await studentBatchModel.findOne({batchId:batchId,deleted:false})   
                return {...JSON.parse(JSON.stringify(result)),status:true,message:'batch creation success'}    
            } 
        }
        else{
            const existing = await studentBatchModel.find({batchName:data.batchName,batchId:{$ne:batchId},deleted:false})
           
            if(existing.length ) return {...JSON.parse(JSON.stringify(existing)),status:false,message:'record already exist in the same name'}
            const batch = await studentBatchModel.updateOne({batchId:batchId},{$set:data})   
            const result = await studentBatchModel.findOne({batchId:batchId,deleted:false})   
            return {...JSON.parse(JSON.stringify(result)),status:true,message:'batch update success'}
        }
    }
    async deleteStudentBatch(data: { batchid: string; }): Promise< void | StudentBatch_Model> {
        const {batchid} = data
        let tempbatchID =   {}
        !batchid.length? tempbatchID  = await this.indexRepo.getIndex({collectionName:'studentsBatch'}) :''
        const batch =await studentBatchModel.findOneAndUpdate({batchid},{$set:{deleted:true}},{upsert:true}) as StudentBatch_Model  
         
        return batch
    }
    async readStudentBatchById(data:{batchid:string}):Promise<StudentBatch_Model|void>{
        const batch =await studentBatchModel.findOne({deleted:false,batchId:data.batchid}) as StudentBatch_Model  
         
        return batch
    }
    async readActiveBatches():Promise<StudentBatch_Model[]|void>{
        try {
            const batch =await studentBatchModel.find({deleted:false})   
            return batch
        } catch (error) {
            
        }
    }
     
}