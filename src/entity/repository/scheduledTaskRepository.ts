import { SchemaTimestampsConfig } from "mongoose"
import { ScheduledTask_Model } from "../models/scheduledTask_Model"

export interface ScheduledTask_Repository{
    createScheduledTask (data:ScheduledTask_Model):Promise<ScheduledTask_Model|void>
    getScheduledTask(data:{email:string,startDate:Date,endDate:Date}):Promise<ScheduledTask_Model[]|void>
    getStudentTask(data:{batchId:string,week:string,startDate:Date,endDate:Date}):Promise<ScheduledTask_Model[]|void>
    prepareAudianceList(data: { ScheduledTaskID: string }): Promise<void>
    designationWiseEventProgress(data: { designation: string; }): Promise<[]>
}