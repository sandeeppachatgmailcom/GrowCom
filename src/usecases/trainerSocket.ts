import { Event_Model } from "../entity/models/eventModel";
import { EventsRepository } from "../entity/repository/eventsRepository";
import { TrainerUsecase } from "../entity/usecases/trainerUseCase";
import { GeneralUtils } from "../interfaces/utils/GeneralUtils";

export class TrainerSocket implements TrainerUsecase{
    constructor(
        private eventRepo :EventsRepository ,
        private genRepo:GeneralUtils
    ){
       
    }
    async getPending(data: { email: string; date: Date; }): Promise<void | Event_Model[]> {
         const events = await this.eventRepo.getTaskByTrainerEmail(data);
         
         console.log(events,'events')
    }
}