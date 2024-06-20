import { ScheduledTask_Model } from "../models/scheduledTask_Model";
import { Academic, UserEntity_Model } from "../models/UserModel";
import { VenueModels } from "../models/venue_model";
import { createdUser } from "../ReturnTypes/createdUser";
import { studentSubmission } from "../ReturnTypes/StudentSubmission";
import { ValidHumanReturnTypes } from "../ReturnTypes/validHuman";
import { FailedStatus_reply } from "../Types/failedStatus";

export interface UserRepository {
    createUser(data: { firstName: string; email: string; password: string; otp:string; googleAuth:boolean } ): Promise<createdUser | void>;
    findUser(data:{email:string}):Promise< UserEntity_Model| void >
    findUserWithPassword(data:{email:string}):Promise< UserEntity_Model & {batch:object}| void >
    login(data:{email:string,password:string,googleAuth:boolean}):Promise< UserEntity_Model|{status:boolean,message:string}|void>;
    saveOtpToCollection(data:{email:string,otp:string}):Promise<{success:boolean,message:string}|void>
    updateUserBasics(data:UserEntity_Model):Promise< UserEntity_Model|void>
    getUsers(): Promise<void | UserEntity_Model[]>
    getActiveTrainers():Promise<void|ValidHumanReturnTypes[]>
    getStudentSubmission(data:{ email: string, startDate: Date, endDate: Date,designation:string }):Promise<void| studentSubmission & ScheduledTask_Model[]>
    getSubmissionDetails(email: string, password: string, googleAuth: boolean ): Promise<UserEntity_Model | void |UserEntity_Model| { status: boolean; message: string }>
    getActiveUsers():Promise<void|ValidHumanReturnTypes[]>
    // readBatchSummaryBystaffId(): Promise<void | { week: string; count: number }[]>
    getBatchWiseStudentsList():Promise<void | any[]>
    getDesignationWiseStaffList():Promise<void | any[] >
}





