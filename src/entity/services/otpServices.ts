export interface OtpServices{
    generateOTP(): Promise<string>;
 }