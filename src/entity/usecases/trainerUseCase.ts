import { Event_Model } from "../models/eventModel";

export interface TrainerUsecase {
    getPending(data:{email:string,date:Date}):Promise<Event_Model[]|void>
}
