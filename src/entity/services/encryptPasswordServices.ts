import { promises } from "dns";

export  interface InterFacehashedPassword {
    hashPassword(password:string):Promise<string>,
    comparePassword(password:string,hashedPassword:string):Promise<boolean>
}