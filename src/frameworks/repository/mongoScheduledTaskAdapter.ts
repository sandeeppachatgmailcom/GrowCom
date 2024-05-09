import { deflate } from "zlib";
import { FailedStatus_reply } from "../../entity/Types/failedStatus";
import { ScheduledTask_Model } from "../../entity/models/scheduledTask_Model";
import { ScheduledTask_Repository } from "../../entity/repository/scheduledTaskRepository";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import scheduledTask_DB from "../models/scheduledTask_DB";
import { lookup } from "dns";

export class MongoScheduledTask implements ScheduledTask_Repository{
      
    async  createScheduledTask(data: ScheduledTask_Model & FailedStatus_reply): Promise<void | ScheduledTask_Model & FailedStatus_reply> {
        try {
            console.log(data, 'final');
            if(data._id) delete data._id  
            if(data.message) delete data.message  
            if(data.status) delete data.status
 
            const result = await scheduledTask_DB.updateOne(
                { ScheduledTaskID: data.ScheduledTaskID },
                { $set: data },
                { upsert: true }
            );
             
            if (result.upsertedCount>0) {
                return {
                    status: true,
                    message: 'created successfullyxxx',
                    ...data
                };
            } else if (result.modifiedCount>0) {
                return {
                    status: true,
                    message: 'updated successfully',
                    ...data
                };
            } else {
                console.log('No changes made');
                return {
                    status: false,
                    message: 'no changes found',
                    ...data
                };
            }
        } catch (error) {
            console.error('Error creating/updating task:', error);
            return; 
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
    async getStudentTask(data: { batchId: string; week: string; startDate: Date; endDate: Date; }): Promise<void | ScheduledTask_Model[]> {
        console.log('reached student schedule repository',data);
        const scheduledTasks = await scheduledTask_DB.aggregate([
            {
                $match: {
                    $and: [
                        {
                            $or: [
                                { 'audience.role.student': true },
                                { [`audience.batches.${data.batchId}`]: true },
                                { [`audience.batches.${data.week}`]: true }
                            ]
                        },
                        { scheduledDate: { $gte: new Date(data.startDate), $lte: new Date( data.endDate) } }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'task',
                    localField: 'taskId',
                    foreignField: 'taskId',
                    as: 'tasks'
                }
            },
             
           
            
        ]) 
        
        
         
        return scheduledTasks;
    }
    
}