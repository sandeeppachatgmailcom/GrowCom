import { VenueModels } from "../models/venue_model";
import { FailedStatus_reply } from "../Types/failedStatus";

export interface VenueRepository {
    getActiveVenue():Promise<VenueModels[]>
    createVenue(data:{venueName:string}):Promise<VenueModels & FailedStatus_reply|void>
}