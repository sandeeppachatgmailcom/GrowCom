import { InterfaceCreateOtp } from "../../entity/services/otpServices";  

export class Custom_OtpGenerator implements InterfaceCreateOtp{
async generateOTP():Promise<string>{
const numericChars = "0123456789"
let otp = ""
for(let i = 0 ;i<4 ;i++){
  const randomIndex = Math.floor(Math.random() * numericChars.length);
  otp += numericChars[randomIndex]
}
console.log(otp,'otp')
return otp
}
}
