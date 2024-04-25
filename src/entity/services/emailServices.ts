export interface interfaceGenerateEmail {
     
    sendEmailVerification(name:string, email:string, verificationCode:string):Promise<{success:boolean}>
}