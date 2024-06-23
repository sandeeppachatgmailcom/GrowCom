import { stringify } from "querystring";
import { Next } from "../entity/Types_1/ServerTypes";
import { UserUseCases } from "../entity/usecases/UserUseCases";
import { UserRepository } from "../entity/repository/userRepository";
import { UserEntity_Model } from "../entity/models/UserModel";
import { EncryptPasswordServices } from "../entity/services/encryptPasswordServices";
import { EmailServices } from "../entity/services/emailServices";
import { OtpServices } from "../entity/services/otpServices";
import { userInput } from "../entity/ReturnTypes/validUser";
import { FailedStatus_reply } from "../entity/Types_1/failedStatus";

export class UserSocket implements UserUseCases {
  constructor(
    
    private repo: UserRepository,
    private passwordManager: EncryptPasswordServices,
    private emailer: EmailServices,
    private otpGenerator: OtpServices
  ) {
     
  }
  async createUser(
    firstName: string,
    email: string,
    password: string,
    googleAuth: boolean,
    next: Next
  ): Promise<any> {
    try {
       
      const hasedpassword = await this.passwordManager.hashPassword(password);
      const userOtp = await this.otpGenerator.generateOTP();
      const sentMail = await this.emailer.sendEmailVerification(
        firstName,
        email,
        userOtp
      );
      const result = await this.repo.createUser({
        firstName,
        email,
        password: hasedpassword,
        otp: userOtp,
        googleAuth,
      });
      return result;
   } catch (error) {
    
   }
  }
  async findUser(email: string, next: Next): Promise<UserEntity_Model | void> {
     
    const result = await this.repo.findUser({ email });
    if (result) {
      return result;
    } else return;
  }
  async saveOtpToCollection(data: {
    email: string;
    otp: string;
  }): Promise<{ status: boolean; message: string } | void> {
    try {
      const { email, otp } = data;
      const user = await this.repo.findUser({ email });
       
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
    googleAuth: boolean,
    next: Next
  ): Promise<
    | UserEntity_Model
    | void
    | UserEntity_Model
    | { status: boolean; message: string }
  > {
    try {
      const user = await this.repo.findUserWithPassword({ email });
      
      if (user) {
        if (!user.active)
          return { status: false, message: "user disabled by admin" };
        const hashedPassword = user.password as string;
        if (googleAuth) {
         
            const result = await this.repo.login({
            email,
            password: hashedPassword,
            googleAuth,
          });
        
          return result;
        }
        const hashedPasswords = await this.passwordManager.comparePassword(
          password,
          hashedPassword
        );
         
        if (hashedPasswords) {
          const result = await this.repo.login({
            email,
            password: hashedPassword,
            googleAuth,
          });
          return result;
        } else {
          return { status: false, message: "Wrong credential" };
        }
      } else {
        return { status: false, message: "user not found" };
      }
    } catch (error) {}
  }
  async updateUserBasics(
    data: UserEntity_Model
  ): Promise<
    | UserEntity_Model
    | (UserEntity_Model & FailedStatus_reply)
    | void
    | FailedStatus_reply
  > {
    try {
      const user = await this.repo.findUser({ email: data.email });
       
      if (user?.active) {
        const result = await this.repo.updateUserBasics(data);

        const out = {
          ...JSON.parse(JSON.stringify(result)),
          status: true,
          message: "Update Success",
        } as UserEntity_Model & FailedStatus_reply;
         
        return out;
      } else if (!user?.active) {
        const data: FailedStatus_reply = {
          status: false,
          message: "This profile is disable by admin",
        };
        return data;
      } else if (!user?.active) {
        const data: FailedStatus_reply = {
          status: false,
          message: "This profile hasbeen deleted, contact the admin",
        };
        return data;
      }
    } catch (error) {}
  }
  async getUsers(): Promise<void | UserEntity_Model[]> {
    try {
      const user = await this.repo.getUsers();
      if (user) return user;
      else return;
    } catch (error) {}
  }
  async forgotOtp(email: string, name: string): Promise<{ success: boolean    }|void> {
    try {
       
      const userOtp: string = await this.otpGenerator.generateOTP();

      const saveOtpToCollection = await this.repo.saveOtpToCollection({
        email,
        otp: userOtp,
      });
      if (saveOtpToCollection?.success) {
        const sentMail = await this.emailer.sendEmailVerification(
          name,
          email,
          userOtp
        );
         
        return JSON.parse(JSON.stringify(sentMail));
      } else {
        return JSON.parse(JSON.stringify(saveOtpToCollection));
      }
    } catch (error) {}
  }
  async resetPassword(
    firstName: string,
    email: string,
    password: string
  ): Promise<UserEntity_Model | { status: boolean }|void> {
    try {
      const hasedpassword = await this.passwordManager.hashPassword(password);
      const result = await this.repo.createUser({
        firstName,
        email,
        password: hasedpassword,
        otp: "",
        googleAuth: true,
      });
      const user = await this.repo.findUser({ email });
      if (user) return user;
      else return { status: false };
    } catch (error) {}
  }
  async getSubmissionDetails(
    email: string,
    password: string,
    googleAuth: boolean,
    next: Next
  ): Promise<
    | UserEntity_Model
    | void
    | UserEntity_Model
    | { status: boolean; message: string }
  > {
    try {
       
      const user = await this.repo.findUserWithPassword({ email });

      const result:any = await this.repo.getSubmissionDetails(
        email,
        password,
        googleAuth
      );
      const schedules = Object.keys(result.submission);
      let tasks = [];
      for (let key in result.submission) {
         
        if (result.submission[key]) {
          for (let task in result.submission[key]) {
            
          }
        }
      }
       
      return result;
    } catch (error) {}
  }
  getDesignationWiseStaffList(): Promise<void | any[]> {
     const result = this.repo.getDesignationWiseStaffList()  
     return result;
  }
  async getBatchWiseStudentsList ():Promise<void | any[]>{
    const user = this.repo.getBatchWiseStudentsList()
    return user
  }
}
