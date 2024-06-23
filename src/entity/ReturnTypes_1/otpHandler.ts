export interface IOtpHandler {
    email:string;
    otp:string ;
    expired:boolean;
    verified:boolean;
    createdTime:Date;
} 