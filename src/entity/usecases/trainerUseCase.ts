import { Event_Model } from "../models/eventModel";

export interface TrainerUsecase {
    getPending(data:{email:string,startDate:Date,endDate:Date}):Promise<Event_Model[]|void>
    
}
