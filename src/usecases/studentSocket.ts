import { ScheduledTask_Model } from "../entity/models/scheduledTask_Model";
import { ScheduledTask_Repository } from "../entity/repository/scheduledTaskRepository";
import { UserRepository } from "../entity/repository/userRepository";
import { StudentUseCase } from "../entity/usecases/StudentUsecase";

export class StudentSocket implements StudentUseCase{
    constructor(
        private scheduledTaskRepo:ScheduledTask_Repository,
        private userRepo:UserRepository
    ){

    }
    async getStudentsTask(data: { email: string; startDate: Date; endDate: Date; }): Promise<void | ScheduledTask_Model[]> {
        // Find the student based on the email
        const student = await this.userRepo.findUser({ email: data.email });
        console.log(student,'student')

        // Assuming you have the student object, proceed to find their tasks
        if (student) {
            // Query for scheduled tasks for the student within the specified date range
            const tasks = await this.scheduledTaskRepo.getStudentTask({batchId:student.batchId as string ,week:student.week,startDate:data.startDate ,endDate:data.endDate })
            
            console.log(tasks,'tasks')
            return tasks;
        } else {
            // Handle the case where the student is not found
            return;
        }
    }
    
}