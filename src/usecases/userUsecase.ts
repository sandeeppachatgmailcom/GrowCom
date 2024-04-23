import { stringify } from "querystring";
import { Next } from "../entity/types/serverTypes";
import { userSocket } from "../entity/usecases/userInterface";
import { UserAdapters } from "../entity/repository/userUsecases";
import { validatedUser } from "../entity/returnTypes/validatedUsed";
import { userEntity } from "../entity/models/userEntity";
import { InterFacehashedPassword } from "../entity/services/hashedPassword";
import { interfaceGenerateEmail } from "../entity/services/emailGenerator";
import { InterfaceCreateOtp } from "../entity/services/otpGenerator";
import MongoDb_UserActivity from "../frameworks/repository/userAdapters";

export class UserSocket implements userSocket {
  constructor(
    private repo: UserAdapters,
    private passwordManager: InterFacehashedPassword,
    private emailer: interfaceGenerateEmail,
    private otpGenerator: InterfaceCreateOtp
  ) {
    console.log("useCase Connect");
  }
  async createUser(
    name: string,
    email: string,
    password: string,
    googleAuth:boolean,
    next: Next
  ): Promise<any> {
    console.log("useCase Connect");
    const hasedpassword = await this.passwordManager.hashPassword(password);
    const userOtp = await this.otpGenerator.generateOTP();
    const sentMail = await this.emailer.sendEmailVerification(name,email,userOtp)
    const result = await this.repo.createUser({
      name,
      email,
      password: hasedpassword,
      otp: userOtp,
      googleAuth 
    });
    return result;
  }
  async findUser(
    email: string,
    next: Next
  ): Promise<userEntity | void> {
    console.log("find User");
    const result = await this.repo.findUser({ email });
    if(result) {return result} else return  ;
  }


  async saveOtpToCollection(data: {
    email: string;
    otp: string;
  }): Promise<{ status: boolean; message: string } | void> {
    try {
      const { email, otp } = data;
      const user = await this.repo.findUser({ email });
      console.log(user, "user");
      if (user) {
        const otp = await this.otpGenerator.generateOTP();
        if (otp) {
          const sentMail = await this.emailer.sendEmailVerification(
            user?.firstName,
            email,
            otp
          );
          if (sentMail.success) return { status: true, message: "success" };
          else return { status: false, message: "failed" };
        }
      } else return { status: false, message: "failed" };
    } catch (error) {}
  }


  async login(
    email: string,
    password: string,
    googleAuth: boolean
  ): Promise<userEntity | void |userEntity| { status: boolean; message: string }> {
    console.log("login");
    const x = await this.repo.findUser({ email });
    if (x) {
      const hashedPassword = x.password as string;
      if(googleAuth){ 
        console.log('hihihih',x)
        return x}
      const hashedPasswords = await this.passwordManager.comparePassword(
        password,
        hashedPassword
      );
      console.log("afrter comaparing", hashedPasswords);
      if (hashedPasswords) {
        console.log("inside hashed", hashedPassword);
        const result = await this.repo.login({
          email,
          password: hashedPassword,
          googleAuth,
        });
        console.log("result", result);
        return result;
      } else {
        console.log("else case", hashedPasswords);
        return {status:false,message:'Wrong credential'}
      }
    }
  }
  async updateUserBasics(data:userEntity):Promise< userEntity|void>{
    const result = await this.repo.updateUserBasics(data)
    return result;  
  }
  async getUsers(): Promise<void|userEntity[]>{
    const user =await this.repo.getUsers();
    if(user) return user 
    else return 
  }
  async forgotOtp (email:string,name:string):Promise<{success:boolean}>{
    console.log('hello usecase',email,name,'email,name')
    const userOtp:string = await this.otpGenerator.generateOTP();
    
    const saveOtpToCollection = await this.repo.saveOtpToCollection({email,otp:userOtp})
    if(saveOtpToCollection?.success){
      const sentMail = await this.emailer.sendEmailVerification(name,email,userOtp)
      console.log(userOtp,sentMail,saveOtpToCollection,'userOtp,sentMail,saveOtpToCollection')
      return JSON.parse(JSON.stringify(sentMail));
    }
    else{
      return JSON.parse(JSON.stringify(saveOtpToCollection));
    }
    
  }
  async resetPassword(email:string,password:string):Promise<userEntity|{status:boolean}>{
    const hasedpassword = await this.passwordManager.hashPassword(password);
    const result = await this.repo.createUser({
      name:'',
      email,
      password: hasedpassword,
      otp:'' ,
      googleAuth:true 
    });
    const user = await this.repo.findUser({ email });
    if(user) return user
    else return {status:false}
  }

   
}
