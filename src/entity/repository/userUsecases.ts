import { academic, userEntity } from "../models/userEntity";
import { createdUser } from "../returnTypes/createdUser";

export interface UserAdapters {
    createUser(data: { name: string; email: string; password: string; otp:string; googleAuth:boolean } ): Promise<createdUser | void>;
    findUser(data:{email:string}):Promise< userEntity| void >
    login(data:{email:string,password:string,googleAuth:boolean}):Promise< userEntity|{status:boolean,message:string}|void>;
    saveOtpToCollection(data:{email:string,otp:string}):Promise<{success:boolean,message:string}|void>
    updateUserBasics(data:userEntity):Promise< userEntity|void>
    getUsers(): Promise<void | userEntity[]>

}
