import { ValidHumanReturnTypes } from "../ReturnTypes/validHuman";
import { DesignationModel } from "../models/designationModel";
import { Event_Model } from "../models/eventModel";
import { StudentBatch_Model } from "../models/studentBatchModel";
import { Task_model } from "../models/taskModel";
import { VenueModels } from "../models/venue_model";
import { StudentBatchRepository } from "../repository/StudentBatchRepository";

export interface UtilUseCases {
    getActiveVenue():Promise<void | VenueModels[]>
    getActiveTrainers():Promise<void|ValidHumanReturnTypes[]>
    getActiveBatches():Promise<void| StudentBatch_Model[] >
    getActiveEvents():Promise<void|Event_Model[]>
    getActiveTask():Promise<void| Task_model[]>
    getActiveDesignation():Promise<void | DesignationModel[]>
    getActiveUsers():Promise<void|ValidHumanReturnTypes[]>
} 