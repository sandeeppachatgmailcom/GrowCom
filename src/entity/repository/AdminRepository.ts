import { UserEntity_Model } from "../models/UserModel";

export interface AdminRepository {
    pending_Approval_Staff(): Promise<void | UserEntity_Model[]>  
}