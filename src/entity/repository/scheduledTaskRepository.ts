import { ScheduledTask_Model } from "../models/scheduledTask_Model"

export interface ScheduledTask_Repository{
    createScheduledTask (data:ScheduledTask_Model):Promise<ScheduledTask_Model|void>
    getScheduledTask(data:{email:string,startDate:Date,endDate:Date}):Promise<ScheduledTask_Model[]|void>
}