import { StudentBatch_Model } from "../entity/models/studentBatchModel"; 
import { UserEntity_Model } from "../entity/models/UserModel";
import { VenueModels } from "../entity/models/venue_model";
import { AdminRepository } from "../entity/Repository/AdminRepository";
import { StudentBatchRepository } from "../entity/repository/StudentBatchRepository"; 
import { FailedStatus_reply } from "../entity/Types/failedStatus";
import { AdminUseCase } from "../entity/usecases/AdminUseCase";
import { VenueRepository } from "../entity/repository/venueRepository";
import { EventsRepository } from "../entity/repository/eventsRepository";
import { Event_Model } from "../entity/models/eventModel";
import { Event_Types } from "../entity/ReturnTypes_1/events";
import { UtilityServices } from "../entity/utils/utilityServices";
import { Task_model } from "../entity/models/taskModel";
import { TaskRepository } from "../entity/repository/taskRepository";


export class AdminSocket implements AdminUseCase{
     
    constructor (
        private repo:AdminRepository,
        private batchRepo:StudentBatchRepository,
        private venueRepo:VenueRepository,
        private eventRepo:EventsRepository,
        private genRepo :UtilityServices,
        private taskRepo:TaskRepository
        
    ){

    }
    async pending_Approval_Staff(): Promise<void | UserEntity_Model[]> {
       try {
            const result = await this.repo.pending_Approval_Staff()
             
            return result;
       } catch (error) {
        
       }
    }
    
    async createBatch(data: StudentBatch_Model): Promise<void | StudentBatch_Model> {
        try {
             
            const result = await this.batchRepo.createStudentBatch(data)
            
            return result;
        } catch (error) {
            
        }
    }

    async createVenue(data: { venueName: string; }): Promise<void | (VenueModels & FailedStatus_reply)> {
        try {
             
            const result = await this.venueRepo.createVenue({venueName:data.venueName}) 
            
            return result;
        } catch (error) {
            
        }
    }
    async  creatAndEditEvents(data: Event_Model): Promise<void | (Event_Types & FailedStatus_reply)> {
        try {
             
            if(data.active && data.startDate !== undefined){
                const datetime = data.startDate
                const weekName = this.genRepo.getDayName(datetime)
                data.dayName = weekName.dayName
                data.monthDay = weekName.monthDay;
                data.yearDay = weekName.day +'-'+weekName.monthDay 
            }
            const result = await this.eventRepo.creatAndEditEvents(data)
            
            return result;
        } catch (error) {
            
        }
    }
    async deleteEvents(data:Event_Model):Promise<Event_Types&FailedStatus_reply|void>{
        try {
             
            const result = await this.eventRepo.deleteEvents(data);
           
            return result
        } catch (error) {
            
        }
    }
    async createTask(data: Task_model): Promise<void | (FailedStatus_reply & Task_model)> {
       try {
            
            const result =await this.taskRepo.crateTask(data)
            
            return result;
       } catch (error) {
        
       }
    }

}