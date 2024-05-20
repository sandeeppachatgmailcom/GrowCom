import { Submission__Model } from "../models/SubmissionModel";
import { ScheduledTask_Model } from "../models/scheduledTask_Model";

export interface StudentUseCase {
    getStudentsTask(data:{email:string,startDate:Date,endDate:Date}):Promise<ScheduledTask_Model[]|void>
    submitStudentsTask(data:Submission__Model):Promise<Submission__Model|void>
}