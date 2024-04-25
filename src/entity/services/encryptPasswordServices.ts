import { promises } from "dns";

export  interface EncryptPasswordServices {
    hashPassword(password:string):Promise<string>,
    comparePassword(password:string,hashedPassword:string):Promise<boolean>
}