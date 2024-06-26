import { ValidHumanReturnTypes } from "../entity/ReturnTypes/validHuman";
import { UserEntity_Model } from "../entity/models/UserModel";
import { DesignationModel } from "../entity/models/designationModel";
import { Event_Model } from "../entity/models/eventModel";
import { StudentBatch_Model } from "../entity/models/studentBatchModel";
import { Task_model } from "../entity/models/taskModel";
import { VenueModels } from "../entity/models/venue_model";
import { DesignationRepository } from "../entity/repository/DesignationRepository";
import { StudentBatchRepository } from "../entity/repository/StudentBatchRepository";
import { EventsRepository } from "../entity/repository/eventsRepository";
import { ScheduledTask_Repository } from "../entity/repository/scheduledTaskRepository";
import { TaskRepository } from "../entity/repository/taskRepository";
import { UserRepository } from "../entity/repository/userRepository";
import { VenueRepository } from "../entity/repository/venueRepository";
import { UtilUseCases } from "../entity/usecases/UtilUseCases";
import scheduledTask_DB from "../frameworks/models/scheduledTask_DB";

export class UtilitySocket implements UtilUseCases{
    constructor (
        private venueRepo:VenueRepository,
        private userRepo:UserRepository,
        private batchRepo:StudentBatchRepository,
        private eventsRepo:EventsRepository,
        private taskRepo:TaskRepository,
        private Designation:DesignationRepository,
        private scheduledTaskRepo:ScheduledTask_Repository,
    ){
        
    }
    async getActiveVenue():Promise<void | VenueModels[]>{
        try {
            const result = await this.venueRepo.getActiveVenue()
        return result;
        } catch (error) {
            
        }
    }
    async getActiveTrainers(): Promise<void | ValidHumanReturnTypes[]> {
       try {
         
        const result = await this.userRepo.getActiveTrainers();
        
        return result;
       } catch (error) {
        
       }
    }
    async  getActiveBatches():Promise<void| StudentBatch_Model[] >{
       try {
         
        const result = await this.batchRepo.readActiveBatches()
        
        return result;
       } catch (error) {
        
       }
    }
    async getActiveEvents(): Promise<void | Event_Model[]> {
        try {
           
        const result = await this.eventsRepo.readActiveEvents();
         
        return result;
        } catch (error) {
            
        }
    }
    async getActiveTask(): Promise<void | Task_model[]> {
        try {
            const tasks = await this.taskRepo.readAllTask()
            //const tasks = []
             
            return tasks
        } catch (error) {
            
        }
    }   
    async getActiveDesignation(): Promise<void | DesignationModel[]> {
       try {
        const designation = await this.Designation.realAllDesination()    
         
        return designation
       } catch (error) {
        
       }
    }
    async getActiveUsers(): Promise<void | ValidHumanReturnTypes[]> {
        try {
          
         const result = await this.userRepo.getActiveUsers();
        
         return result;
        } catch (error) {
         
        }
     }
    async getStudentsTaskProgressRatio(data: { email: string; }): Promise<void | UserEntity_Model[]> {
            try {
               
                const result = await this.scheduledTaskRepo.getStudentsTaskProgressRatio(data)
                return result
            } catch (error) {
                
            }
    } 
    async getuserDetailsByEmail(data:{email:string}):Promise<void|UserEntity_Model>{
        try {
            const result = await this.userRepo.findUser(data);
            return result
        } catch (error) {
            
        }
    }

}