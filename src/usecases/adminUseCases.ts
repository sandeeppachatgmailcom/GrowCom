import { StudentBatch_Model } from "../entity/models/studentBatch"; 
import { UserEntity_Model } from "../entity/models/User";
import { VenueModels } from "../entity/models/venue_model";
import { AdminRepository } from "../entity/Repository/AdminRepository";
import { StudentBatchRepository } from "../entity/repository/StudentBatchRepository"; 
import { FailedStatus_reply } from "../entity/Types/failedStatus";
import { AdminUseCase } from "../entity/usecases/AdminUseCase";
import { VenueRepository } from "../entity/repository/venueRepository";

export class AdminSocket implements AdminUseCase{
     
    constructor (
        private repo:AdminRepository,
        private batchRepo:StudentBatchRepository,
        private venueRepo:VenueRepository
        
    ){

    }
    async pending_Approval_Staff(): Promise<void | UserEntity_Model[]> {
        const result = await this.repo.pending_Approval_Staff()
        console.log(result ,'result is printing here ')
        return result;
    }
    
    async createBatch(data: StudentBatch_Model): Promise<void | StudentBatch_Model> {
        const result = await this.batchRepo.createStudentBatch(data)
        console.log(result,'create batch')
        return result;
    }
    async createVenue(data: { venueName: string; }): Promise<void | (VenueModels & FailedStatus_reply)> {
        console.log('reached socket')
        const result = await this.venueRepo.createVenue({venueName:data.venueName}) 
        console.log(result,'returned to socket')
        return result;
    }


}