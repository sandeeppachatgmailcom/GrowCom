export interface EmailServices {
     
    sendEmailVerification(name:string, email:string, verificationCode:string):Promise<{success:boolean}>
}