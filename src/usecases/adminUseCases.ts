import { UserEntity_Model } from "../entity/Models/User";
import { AdminRepository } from "../entity/Repository/AdminRepository";
import { AdminUseCase } from "../entity/Usecases/AdminUseCase";

export class AdminSocket implements AdminUseCase{
     
    constructor (
        private repo:AdminRepository
    ){

    }
    async pending_Approval_Staff(): Promise<void | UserEntity_Model[]> {
        const result = await this.repo.pending_Approval_Staff()
        console.log(result ,'result is printing here ')
        return result;
    }
}