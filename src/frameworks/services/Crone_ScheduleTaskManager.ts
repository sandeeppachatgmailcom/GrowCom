import { ScheduledTask_Model } from "../../entity/models/scheduledTask_Model";
import { ScheduledTask_Repository } from "../../entity/repository/scheduledTaskRepository";
import {  ScheduledTaskManagerService } from "../../entity/services/scheduledTaskManager";
import cron from 'node-cron';

export default class Crone_ScheduleTaskManager implements ScheduledTaskManagerService{
    constructor(
      private scheduleTaskRepo: ScheduledTask_Repository
    ){

    }
    async endTask(task: ScheduledTask_Model): Promise<void> {
        const endCronExpression = this.constructCronExpression(task.endDateTime, task.submissionDate);
        const endJob = cron.schedule(endCronExpression, () => {
          console.log(`task starts at ${endCronExpression}`)
        },{
          scheduled: true,
          timezone: 'Asia/Kolkata'
        });
    
        endJob.start();
       // return Promise.resolve(true); 
      }

    async startTask(task: ScheduledTask_Model): Promise<void > {
        const startCronExpression = this.constructCronExpression(task.startDateTime, task.scheduledDate);
        
        const startJob = cron.schedule(startCronExpression, () => {
            console.log(`task starts at ${startCronExpression}`)
            this.scheduleTaskRepo.prepareAudianceList({ScheduledTaskID:task.ScheduledTaskID})
        },
        {
          scheduled: true,
          timezone: 'Asia/Kolkata'
        });
        console.log('test printing',)
        startJob.start();
       // return Promise.resolve(true); // Resolve after scheduling the start job
      }

    private constructCronExpression(dateTime: string, mydate: Date): string {
   
        const minute =  dateTime.split(':')[1];
        const hour = dateTime.split(':')[0];
        const dayOfMonth =mydate.split('T')[0].split('-')[2];
        const month =mydate.split('T')[0].split('-')[1]; // Zero-indexed
        return `0 ${minute} ${hour} ${dayOfMonth} ${month} *`;
    }
    
       
}
