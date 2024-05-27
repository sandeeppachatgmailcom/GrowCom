import { ValidHumanReturnTypes } from "../entity/ReturnTypes/validHuman";
import { DesignationModel } from "../entity/models/designationModel";
import { Event_Model } from "../entity/models/eventModel";
import { StudentBatch_Model } from "../entity/models/studentBatchModel";
import { Task_model } from "../entity/models/taskModel";
import { VenueModels } from "../entity/models/venue_model";
import { DesignationRepository } from "../entity/repository/DesignationRepository";
import { StudentBatchRepository } from "../entity/repository/StudentBatchRepository";
import { EventsRepository } from "../entity/repository/eventsRepository";
import { TaskRepository } from "../entity/repository/taskRepository";
import { UserRepository } from "../entity/repository/userRepository";
import { VenueRepository } from "../entity/repository/venueRepository";
import { UtilUseCases } from "../entity/usecases/UtilUseCases";

export class UtilitySocket implements UtilUseCases{
    constructor (
        private venueRepo:VenueRepository,
        private userRepo:UserRepository,
        private batchRepo:StudentBatchRepository,
        private eventsRepo:EventsRepository,
        private taskRepo:TaskRepository,
        private Designation:DesignationRepository
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
        console.log('reached user socket')
        const result = await this.userRepo.getActiveTrainers();
        console.log(result ,'result at socket')
        return result;
       } catch (error) {
        
       }
    }
    async  getActiveBatches():Promise<void| StudentBatch_Model[] >{
       try {
        console.log('get Active usecase reached ')
        const result = await this.batchRepo.readActiveBatches()
        console.log(result,'result')
        return result;
       } catch (error) {
        
       }
    }
    async getActiveEvents(): Promise<void | Event_Model[]> {
        try {
            console.log('reached utility socket  ')
        const result = await this.eventsRepo.readActiveEvents();
        console.log('socet result',result)
        return result;
        } catch (error) {
            
        }
    }
    async getActiveTask(): Promise<void | Task_model[]> {
        try {
            const tasks = await this.taskRepo.readAllTask()
            //const tasks = []
            console.log(tasks,'taskssss')
            return tasks
        } catch (error) {
            
        }
    }   
    async getActiveDesignation(): Promise<void | DesignationModel[]> {
       try {
        const designation = await this.Designation.realAllDesination()    
        console.log(designation)
        return designation
       } catch (error) {
        
       }
    }
}