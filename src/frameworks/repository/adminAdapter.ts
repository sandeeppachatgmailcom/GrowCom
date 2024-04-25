import { userEntity } from "../../entity/models/User";
import { adminAdapter } from "../../entity/repository/adminRepoUseCases";
import userModel from "../models/userModel";

export class MongoDb_AdminAdapter implements adminAdapter{
    constructor(){

    }
    async pending_Approval_Staff(): Promise<void | userEntity[]> {
        const pendingUsers = await userModel.find({deleted:false})
         
        if (pendingUsers) return pendingUsers     
        else return  
    }
}