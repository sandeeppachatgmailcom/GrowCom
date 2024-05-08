import { FailedStatus_reply } from "../../entity/Types/failedStatus";
import { ScheduledTask_Model } from "../../entity/models/scheduledTask_Model";
import { ScheduledTask_Repository } from "../../entity/repository/scheduledTaskRepository";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import scheduledTask_DB from "../models/scheduledTask_DB";

export class MongoScheduledTask implements ScheduledTask_Repository{
      
    async  createScheduledTask(data: ScheduledTask_Model): Promise<void | ScheduledTask_Model & FailedStatus_reply> {
        try {
            console.log(data, 'final');
            const result = await scheduledTask_DB.updateOne(
                { ScheduledTaskID: data.ScheduledTaskID },
                { $set: data },
                { upsert: true }
            );
    
            if (result.upsertedCount) {
                return {
                    status: true,
                    message: 'created successfully',
                    ...data
                };
            } else if (result.modifiedCount) {
                return {
                    status: true,
                    message: 'updated successfully',
                    ...data
                };
            } else {
                console.log('No changes made');
                return; // Return void if no changes were made
            }
        } catch (error) {
            console.error('Error creating/updating task:', error);
            return; // Return void or appropriate error handling
        }
    }
    
    async getScheduledTask(data: { email: string; startDate: Date; endDate: Date; }): Promise<void | ScheduledTask_Model[]> {
        console.log('reached mongo db',data)
        const scheduledTask = await scheduledTask_DB.find({
            staffInCharge: data.email,
            scheduledDate: { $gte: data.startDate, $lte: data.endDate }
        });
          console.log(scheduledTask,'scheduledTask')
        if (scheduledTask)  return scheduledTask
        else return []
        
    }
}