import { Event_Model } from "../models/eventModel";
import { StudentBatch_Model } from "../models/studentBatch";
import { Task_model } from "../models/task";
import { UserEntity_Model  } from "../models/User";
import { VenueModels } from "../models/venue_model";
import { Event_Types } from "../ReturnTypes/events";
import { FailedStatus_reply } from "../Types/failedStatus";

export interface AdminUseCase {
    pending_Approval_Staff():Promise<UserEntity_Model[]|void>
    createBatch(data:StudentBatch_Model):Promise<StudentBatch_Model|void>
    createVenue(data:{venueName:string}):Promise<VenueModels & FailedStatus_reply|void>
    creatAndEditEvents(data:Event_Model):Promise<Event_Types & FailedStatus_reply|void>
    deleteEvents(data:Event_Model):Promise<Event_Types & FailedStatus_reply|void>
    createTask(data:Task_model):Promise<FailedStatus_reply& Task_model| void>
}