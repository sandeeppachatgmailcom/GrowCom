import { StudentBatch_Model } from "../entity/models/studentBatch"; 
import { UserEntity_Model } from "../entity/models/User";
import { VenueModels } from "../entity/models/venue_model";
import { AdminRepository } from "../entity/Repository/AdminRepository";
import { StudentBatchRepository } from "../entity/repository/StudentBatchRepository"; 
import { FailedStatus_reply } from "../entity/Types/failedStatus";
import { AdminUseCase } from "../entity/usecases/AdminUseCase";
import { VenueRepository } from "../entity/repository/venueRepository";
import { EventsRepository } from "../entity/repository/eventsRepository";
import { Event_Model } from "../entity/models/eventModel";
import { Event_Types } from "../entity/ReturnTypes/events";
import { UtilityServices } from "../entity/utils/utilityServices";
import { Task_model } from "../entity/models/task";
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
        const result = await this.repo.pending_Approval_Staff()
        console.log(result ,'result is printing here ')
        return result;
    }
    
    async createBatch(data: StudentBatch_Model): Promise<void | StudentBatch_Model> {
        console.log('before create batch')
        const result = await this.batchRepo.createStudentBatch(data)
        console.log(result,'create batch')
        return result;
    }

    async createVenue(data: { venueName: string; }): Promise<void | (VenueModels & FailedStatus_reply)> {
        console.log('reached socket')
        const result = await this.venueRepo.createVenue({venueName:data.venueName}) 
        console.log(result,'returned to socket')
        return result;
    }
    async  creatAndEditEvents(data: Event_Model): Promise<void | (Event_Types & FailedStatus_reply)> {
        console.log('reached admin socket ')
        if(data.active && data.startDate !== undefined){
            const datetime = data.startDate
             const weekName = this.genRepo.getDayName(datetime)
             data.dayName = weekName.dayName
             data.monthDay = weekName.monthDay;
             data.yearDay = weekName.day +'-'+weekName.monthDay 
        }
        const result = await this.eventRepo.creatAndEditEvents(data)
        console.log(result,'result of events')
        return result;
    }
    async deleteEvents(data:Event_Model):Promise<Event_Types&FailedStatus_reply|void>{
        console.log('reached admin socket ')
        const result = await this.eventRepo.deleteEvents(data);
        console.log(result,'deleted result')
        return result
    }
    async createTask(data: Task_model): Promise<void | (FailedStatus_reply & Task_model)> {
        console.log('reached admin socket')
        const result =await this.taskRepo.crateTask(data)
        console.log(result,'task result')
        return result;
    }

}