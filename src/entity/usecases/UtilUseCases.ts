import { ValidHumanReturnTypes } from "../ReturnTypes/validHuman";
import { Event_Model } from "../models/eventModel";
import { StudentBatch_Model } from "../models/studentBatch";
import { VenueModels } from "../models/venue_model";
import { StudentBatchRepository } from "../repository/StudentBatchRepository";

export interface UtilUseCases {
    getActiveVenue():Promise<void | VenueModels[]>
    getActiveTrainers():Promise<void|ValidHumanReturnTypes[]>
    getActiveBatches():Promise<void| StudentBatch_Model[] >
    getActiveEvents():Promise<void|Event_Model[]>
} 