import { UserEntity_Model } from "../../entity/models/UserModel";
import { AdminRepository } from "../../entity/Repository/AdminRepository";
import userModel from "../models/userModel";

export class MongoDb_AdminAdapter implements AdminRepository{
    constructor(){

    }
    /**
 * Retrieves a list of staff members who are pending approval within the system.
 * These staff members have completed the registration process but require further
 * review or approval before they can access certain functionalities or resources.
 * 
 * @returns {Array} An array containing objects representing each pending staff member.
 * Each object includes relevant details such as name, email, and registration date.
 */
    async pending_Approval_Staff(): Promise<void | UserEntity_Model[]> {
        const pendingUsers = await userModel.find({deleted:false})
        if (pendingUsers) return pendingUsers     
        else return  
    }
}