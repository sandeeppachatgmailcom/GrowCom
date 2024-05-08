import { Event_Model } from "../models/eventModel";
import { ScheduledTask_Model } from "../models/scheduledTask_Model";

export interface TrainerUsecase {
    getPending(data:{email:string,startDate:Date,endDate:Date}):Promise<ScheduledTask_Model[]|void>
    createScheduledTask (data:ScheduledTask_Model):Promise<ScheduledTask_Model|void>
}
