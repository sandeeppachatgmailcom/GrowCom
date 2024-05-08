import { ValidHumanReturnTypes } from "../ReturnTypes/validHuman";
import { Event_Model } from "../models/eventModel";
import { StudentBatch_Model } from "../models/studentBatch";
import { Task_model } from "../models/task";
import { VenueModels } from "../models/venue_model";
import { StudentBatchRepository } from "../repository/StudentBatchRepository";

export interface UtilUseCases {
    getActiveVenue():Promise<void | VenueModels[]>
    getActiveTrainers():Promise<void|ValidHumanReturnTypes[]>
    getActiveBatches():Promise<void| StudentBatch_Model[] >
    getActiveEvents():Promise<void|Event_Model[]>
    getActiveTask():Promise<void| Task_model[]>
} 