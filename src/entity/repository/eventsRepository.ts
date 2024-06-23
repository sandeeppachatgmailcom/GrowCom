import { EventTypes } from "../ReturnTypes/events";
import { FailedStatus_reply } from "../Types/failedStatus";
import { Event_Model } from "../models/eventModel";

export interface EventsRepository{
    creatAndEditEvents(data:Event_Model):Promise<EventTypes & FailedStatus_reply|void>
    deleteEvents(data:Event_Model):Promise<EventTypes&FailedStatus_reply|void>
    readActiveEvents():Promise<Event_Model[]|void>
    getTaskByTrainerEmail(data:{email:string}):Promise<Event_Model[]|void>
    getTaskByDesignation(data:{designation:string}):Promise<Event_Model[]|void>
}