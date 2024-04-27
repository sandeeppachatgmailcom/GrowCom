import { StudentBatch_Model } from "../entity/Models/StudentBatch";
import { UserEntity_Model } from "../entity/Models/User";
import { AdminRepository } from "../entity/Repository/AdminRepository";
import { StudentBatchRepository } from "../entity/Repository/StudentBatchRepository";
import { AdminUseCase } from "../entity/Usecases/AdminUseCase";

export class AdminSocket implements AdminUseCase{
     
    constructor (
        private repo:AdminRepository,
        private batchRepo:StudentBatchRepository
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
}