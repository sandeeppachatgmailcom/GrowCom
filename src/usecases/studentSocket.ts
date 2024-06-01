import { stat } from "fs";
import { Submission__Model } from "../entity/models/SubmissionModel";
import { ScheduledTask_Model } from "../entity/models/scheduledTask_Model";
import { ScheduledTask_Repository } from "../entity/repository/scheduledTaskRepository";
import { Submission_Repo } from "../entity/repository/submissionRepo";
import { UserRepository } from "../entity/repository/userRepository";
import { StudentUseCase } from "../entity/usecases/StudentUsecase";
import { SerialNumbersRepository } from "../entity/repository/serialNumberRepository";
import { StudentBatchRepository } from "../entity/repository/StudentBatchRepository";

export class StudentSocket implements StudentUseCase{
    constructor(
        private scheduledTaskRepo:ScheduledTask_Repository,
        private userRepo:UserRepository,
        private submissionRepo:Submission_Repo,
        private serialNumberRepo:SerialNumbersRepository,
        private studentBatchRepo:StudentBatchRepository
    ){

    }
        async getStudentsTask(data: { email: string; startDate: Date; endDate: Date; }): Promise<void | ScheduledTask_Model[]> {
      try {
              // Find the student based on the email
            const student = await this.userRepo.findUser({ email: data.email });
             
            const batch = await this.studentBatchRepo.readActiveBatches()
            
            let batchName=''
            for (let key in batch){
                
                if(batch[key]?.batchId ==student?.batchId) batchName = batch[key].batchName
            }
            
            // Assuming you have the student object, proceed to find their tasks
            if (student) {
                // Query for scheduled tasks for the student within the specified date range
                const tasks = await this.scheduledTaskRepo.getStudentTask({batchId:batchName as string ,week:student.week,startDate:data.startDate ,endDate:data.endDate })
                
                 
                return tasks;
            } else {
                // Handle the case where the student is not found
                return;
            }
      } catch (error) {
        
      }
    }
    async submitStudentsTask(data: Submission__Model): Promise<void | Submission__Model> {
        try {
            if(!data.submissionId){
                data.submissionId= (await this.serialNumberRepo.getIndex({collectionName:'submission'})).serialNumber
            }
            const  status  = await this.submissionRepo.createSubmission(data) 
            return status
        } catch (error) {
            
        }
    }
    
}