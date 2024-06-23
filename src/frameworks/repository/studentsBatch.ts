import { StudentBatch_Model } from "../../entity/models/studentBatchModel";
import { StudentBatchRepository } from "../../entity/repository/StudentBatchRepository";
import mongoose from "mongoose";
import studentBatchModel from "../models/studentsBatch";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import { FailedStatus_reply } from "../../entity/Types_1/failedStatus";

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
    async readBatchSummaryBystaffId(data: { designation: string; }): Promise<void | []> {
        try {
            
            const result  = await studentBatchModel.aggregate([
                {
                    $match:{
                        trainer:data.designation
                    }
                },
                {
                    $lookup:{
                        from:'users',
                        localField:'batchId',
                        foreignField:'batchId',
                        as :'students'
                    }
                },
                {
                    $project:{
                        _id:1,
                        batchId:1,
                        BatchType:1,
                        __v:1,
                        active:1,
                        batchName:1,
                        deleted:1,
                        edited:1,
                        endDate:1 ,
                        location:1,
                        maxCapacity:1,
                        startDate:1 ,
                        trainer:1,
                        venue:1,
                        cordinator:1,
                        'students.week':1,
                        'students.firstName':1,
                        'students.email':1,
                         
                    }
                }
            ])



            if(result){
                return result
            }
            else
            return []
        } catch (error) {
            console.log(error)
        }
    } 
}