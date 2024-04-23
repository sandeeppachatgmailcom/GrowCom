import { userEntity } from "../models/userEntity";

export interface adminSocket {
    pending_Approval_Staff():Promise<userEntity[]|void>
}