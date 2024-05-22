import { UserEntity_Model } from "../models/UserModel";
import { validatedUser } from "../ReturnTypes/validatedUsed";
import { Next } from "../Types/ServerTypes";
import { createdUser } from "../ReturnTypes/createdUser";
import { FailedStatus_reply } from "../Types/failedStatus";


export interface UserUseCases{
    createUser(name:string,email:string,password:string,googleAuth:boolean,next:Next):Promise<string>
    findUser(email:string,next:Next):Promise<UserEntity_Model | void>
    login(email:string,password:string, googleAuth:boolean,next:Next):Promise<UserEntity_Model &{status?:boolean,message?:string} | void | {status:boolean,message:string}>
    saveOtpToCollection(data:{email:string,otp:string}):Promise<{status:boolean,message:string}|void>
    updateUserBasics(data:UserEntity_Model):Promise< UserEntity_Model|void|FailedStatus_reply>
    getUsers(): Promise<void|UserEntity_Model[]>
    forgotOtp (email:string,name:string):Promise<{success:boolean}>
    resetPassword(firstName:string,email:string,password:string):Promise<UserEntity_Model|{status:boolean}>
    getSubmissionDetails(email: string, password: string, googleAuth: boolean, next:Next ): Promise<UserEntity_Model | void |UserEntity_Model| { status: boolean; message: string }>
}