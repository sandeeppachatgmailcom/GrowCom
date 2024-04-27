import { Academic, UserEntity_Model } from "../Models/User";
import { createdUser } from "../ReturnTypes/createdUser";

export interface UserRepository {
    createUser(data: { firstName: string; email: string; password: string; otp:string; googleAuth:boolean } ): Promise<createdUser | void>;
    findUser(data:{email:string}):Promise< UserEntity_Model| void >
    login(data:{email:string,password:string,googleAuth:boolean}):Promise< UserEntity_Model|{status:boolean,message:string}|void>;
    saveOtpToCollection(data:{email:string,otp:string}):Promise<{success:boolean,message:string}|void>
    updateUserBasics(data:UserEntity_Model):Promise< UserEntity_Model|void>
    getUsers(): Promise<void | UserEntity_Model[]>

}
