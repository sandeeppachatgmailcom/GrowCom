import { userEntity } from "../models/userEntity";
import { validatedUser } from "../returnTypes/validatedUsed";
import { Next } from "../types/serverTypes";
import { createdUser } from "../returnTypes/createdUser";


export interface userSocket{
    createUser(name:string,email:string,password:string,googleAuth:boolean,next:Next):Promise<string>
    findUser(email:string,next:Next):Promise<userEntity | void>
    login(email:string,password:string, googleAuth:boolean,next:Next):Promise<userEntity | void | {status:boolean,message:string}>
    saveOtpToCollection(data:{email:string,otp:string}):Promise<{status:boolean,message:string}|void>
    updateUserBasics(data:userEntity):Promise< userEntity|void>
    getUsers(): Promise<void|userEntity[]>
    forgotOtp (email:string,name:string):Promise<{success:boolean}>
    resetPassword(email:string,password:string):Promise<userEntity|{status:boolean}>
    
}