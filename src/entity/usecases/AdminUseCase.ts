import { UserEntity_Model  } from "../Models/User";

export interface AdminUseCase {
    pending_Approval_Staff():Promise<UserEntity_Model[]|void>
}