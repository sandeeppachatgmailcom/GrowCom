import { userEntity } from "../models/User";

export interface adminSocket {
    pending_Approval_Staff():Promise<userEntity[]|void>
}