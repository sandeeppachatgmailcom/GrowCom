import { StudentBatch_Model } from "../models/studentBatch";
import { UserEntity_Model  } from "../models/User";
import { VenueModels } from "../models/venue_model";
import { FailedStatus_reply } from "../Types/failedStatus";

export interface AdminUseCase {
    pending_Approval_Staff():Promise<UserEntity_Model[]|void>
    createBatch(data:StudentBatch_Model):Promise<StudentBatch_Model|void>
    createVenue(data:{venueName:string}):Promise<VenueModels & FailedStatus_reply|void>
}