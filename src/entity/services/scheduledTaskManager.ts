import { ScheduledTask_Model } from "../models/scheduledTask_Model";

export interface ScheduledTaskManagerService {
    startTask(task: ScheduledTask_Model): Promise<void>;
    endTask(task: ScheduledTask_Model): Promise<void>;
}
   