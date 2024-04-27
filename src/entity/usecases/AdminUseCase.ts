import { StudentBatch_Model } from "../Models/StudentBatch";
import { UserEntity_Model  } from "../Models/User";

export interface AdminUseCase {
    pending_Approval_Staff():Promise<UserEntity_Model[]|void>
    createBatch(data:StudentBatch_Model):Promise<StudentBatch_Model|void>
}