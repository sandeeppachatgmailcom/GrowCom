import { ScheduledTask_Model } from "../models/scheduledTask_Model";

export interface StudentUseCase {
    getStudentsTask(data:{email:string,startDate:Date,endDate:Date}):Promise<ScheduledTask_Model[]|void>
}