import { FailedStatus_reply } from "../Types/failedStatus";
import { UserEntity_Model } from "../models/UserModel";
import { Event_Model } from "../models/eventModel";
import { ScheduledTask_Model } from "../models/scheduledTask_Model";

export interface TrainerUsecase {
    getPending(data:{email:string,startDate:Date,endDate:Date}):Promise<ScheduledTask_Model[]|void>
    createScheduledTask (data:ScheduledTask_Model):Promise<ScheduledTask_Model|void>
    updateMarkToCollection(data:{email:string ,ScheduledTaskID:string,taskId:string,mark:string, comment:string,verified:boolean}):Promise<void | UserEntity_Model & FailedStatus_reply >
    designationWiseProgress(data:{designation:string}):Promise<void|[]>
    getWeeklyStudentssummary(): Promise<void | { week: string; count: number }[]>
    designationWiseEventProgress (data:{designation:string}):Promise<[]>
}
