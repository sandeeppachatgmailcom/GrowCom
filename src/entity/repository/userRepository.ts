import { Academic, UserEntity_Model } from "../models/User";
import { VenueModels } from "../models/venue_model";
import { createdUser } from "../ReturnTypes/createdUser";
import { ValidHumanReturnTypes } from "../ReturnTypes/validHuman";
import { FailedStatus_reply } from "../Types/failedStatus";

export interface UserRepository {
    createUser(data: { firstName: string; email: string; password: string; otp:string; googleAuth:boolean } ): Promise<createdUser | void>;
    findUser(data:{email:string}):Promise< UserEntity_Model| void >
    findUserWithPassword(data:{email:string}):Promise< UserEntity_Model| void >
    login(data:{email:string,password:string,googleAuth:boolean}):Promise< UserEntity_Model|{status:boolean,message:string}|void>;
    saveOtpToCollection(data:{email:string,otp:string}):Promise<{success:boolean,message:string}|void>
    updateUserBasics(data:UserEntity_Model):Promise< UserEntity_Model|void>
    getUsers(): Promise<void | UserEntity_Model[]>
    getActiveTrainers():Promise<void|ValidHumanReturnTypes[]>
}
