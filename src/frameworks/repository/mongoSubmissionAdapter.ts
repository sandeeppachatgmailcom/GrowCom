import { Submission__Model } from "../../entity/models/SubmissionModel";
import { FailedStatus_reply } from "../../entity/Types/failedStatus";
import { Submission_Repo } from "../../entity/repository/submissionRepo";
import { Document, Schema } from "mongoose";
import { privateDecrypt } from "crypto";
import { SerialNumbers_Model } from "../../entity/models/SerialNumbersModel";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import submission_Db from "../models/submission_Model";

export class MongoSubmissionAdapter implements Submission_Repo{
    taskID :string='' 
    constructor(
        
        private serialNumberRepo:SerialNumbersRepository
    ){
        
    }
    async createSubmission(data: Submission__Model): Promise<void | (Submission__Model & FailedStatus_reply)> {
        console.log('reached here mongoDb')
       
        const save =await submission_Db.updateOne({submissionId:data.submissionId},{$set:data}, {upsert:true})
        if(save.upsertedCount>0)
            return {status:true,message:'submission Success', ...data}
        else if (save.modifiedCount>0){
            return {status:true,message:'submission updated ', ...data}
        }
        else {
            return {status:false,message:'no canges found  ', ...data}
        }
    }
}