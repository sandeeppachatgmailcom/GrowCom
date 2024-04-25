import { UserEntity_Model } from "../Models/User";

export interface AdminRepository {
    pending_Approval_Staff(): Promise<void | UserEntity_Model[]>  
}