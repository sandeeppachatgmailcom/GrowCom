import { Task_model } from "../../entity/models/taskModel";
import { TaskRepository } from "../../entity/repository/taskRepository";
import task_db from "../models/taskModel";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import { Mongo_Serial_Number } from "./monGoSerialnumberAdapter";
import { FailedStatus_reply } from "../../entity/Types/failedStatus";

export class MongoTaskRepository implements TaskRepository{
    constructor(
        private serial: SerialNumbersRepository
    ){

    }
    async crateTask(data:Task_model): Promise<FailedStatus_reply&Task_model| void > {
        const temp = {
            new:false
        }
        if(!data.taskId) {
            
            const serial = await this.serial.getIndex( {collectionName:'task'}) 
            temp.new = true;
            data.taskId = serial.serialNumber
            const exist = await  task_db.findOne({taskName:data.taskName})    
            if(exist && temp.new){
               
                return {status:false,message:'already record exist in the same name',...JSON.parse(JSON.stringify(exist))}
                
            }
            else{
                const insert = await task_db.updateOne({taskId:data.taskId},{$set:data},{upsert:true})    
                if(insert.modifiedCount) return {status:true,message:'Task updation success.. ',...JSON.parse(JSON.stringify(data))}
                else if(insert.upsertedCount)  return {status:true,message:'Task creation success.. ',...JSON.parse(JSON.stringify(data))}
            }
        }
        else {
            const insert = await task_db.updateOne({taskId:data.taskId},{$set:data},{upsert:true})
            if(insert.modifiedCount) return {status:true,message:'Task updation success.. ',...JSON.parse(JSON.stringify(data))}
            else if(insert.upsertedCount)  return {status:true,message:'Task creation success.. ',...JSON.parse(JSON.stringify(data))}

        } 
    }
    async readAllTask(): Promise<void | Task_model[]> {
        const allTask = await task_db.find({deleted:false})
        if(allTask) return allTask 
        else return []      
    }
}