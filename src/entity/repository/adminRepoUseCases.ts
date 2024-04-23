import { userEntity } from "../models/userEntity";

export interface adminAdapter {
    pending_Approval_Staff(): Promise<void | userEntity[]>  
}