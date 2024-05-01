import { ValidHumanReturnTypes } from "../ReturnTypes/validHuman";
import { VenueModels } from "../models/venue_model";

export interface UtilUseCases {
    getActiveVenue():Promise<void | VenueModels[]>
    getActiveTrainers():Promise<void|ValidHumanReturnTypes[]>
} 