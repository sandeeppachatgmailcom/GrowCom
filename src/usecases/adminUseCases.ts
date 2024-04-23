import { userEntity } from "../entity/models/userEntity";
import { adminAdapter } from "../entity/repository/adminRepoUseCases";
import { adminSocket } from "../entity/usecases/adminSocket";

export class AdminSocket implements adminSocket{
     
    constructor (
        private repo:adminAdapter
    ){

    }
    async pending_Approval_Staff(): Promise<void | userEntity[]> {
        const result = await this.repo.pending_Approval_Staff()
        console.log(result ,'result is printing here ')
        return result;
    }
}