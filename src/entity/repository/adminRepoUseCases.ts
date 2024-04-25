import { userEntity } from "../models/User";

export interface adminAdapter {
    pending_Approval_Staff(): Promise<void | userEntity[]>  
}