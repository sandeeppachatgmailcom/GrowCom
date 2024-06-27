// Import necessary modules and types
import { UserRepository } from "../../entity/repository/userRepository";
import { UserEntity_Model } from "../../entity/models/UserModel";
import userModel from "../models/userModel";
import { createdUser } from "../../entity/ReturnTypes/createdUser";
import { validatedUser } from "../../entity/ReturnTypes/validatedUsed";
import { ValidHumanReturnTypes } from "../../entity/ReturnTypes/validHuman";
import { studentSubmission } from "../../entity/ReturnTypes/StudentSubmission";
import { ScheduledTask_Model } from "../../entity/models/scheduledTask_Model";
import { userInput } from "../../entity/ReturnTypes/validUser";
import designationDb from "../models/designationModel";
import { count } from "console";

// Define and export UserAdapters class
class MongoDb_UserActivity implements UserRepository {
  constructor() {}

  async createUser(data: {
    firstName: string;
    email: string;
    password: string;
    otp: string;
    googleAuth: boolean;
  }): Promise<createdUser | void> {
    try {
      const { firstName, email, password, otp, googleAuth } = data;
      const name = firstName;

      const result = await userModel.updateOne(
        { email: email },
        {
          $set: {
            firstName: firstName,
            email: email,
            password: password,
            otp: otp,
            otpVerified: googleAuth,
          },
        },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        return { name, email, password, status: true };
      } else {
        return { name, email, password, status: false };
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }
  async findUser(data: { email: string; }): Promise<void | UserEntity_Model>  {
    try {
      const { email } = data;
      const user = await userModel.findOne({ email }, { password: 0 });

      if (user) {
        return user;
      } else return;
    } catch (err) {
      console.log(err);
    }
  }
  async findUserWithPassword(data: {
    email: string;
    pasword: string;
  }): Promise<(UserEntity_Model & { batch: object }) | void> {
    try {
      const { email } = data;
      const user = await userModel.findOne({ email });

      if (user) {
        return JSON.parse(JSON.stringify(user));
      } else return;
    } catch (err) {
      console.log(err);
    }
  }

  async login(data: { email: string; password: string; googleAuth: boolean }) {
    try {
      const { email, password, googleAuth } = data;

      //const user = await userModel.findOne({email:email,password:password})
      const user: any  = await userModel.aggregate([
        {
          $match: { email },
        },
        {
          $lookup: {
            from: "studentbatches",
            localField: "batchId",
            foreignField: "batchId",
            as: "batch",
          },
        },
        {
          $lookup: {
            from: "designations",
            localField: "designation",
            foreignField: "id",
            as: "designationDetail",
          },
        },
      ]);

      const tempData :any|UserEntity_Model[] = JSON.parse(JSON.stringify(user[0]));
      delete tempData.password;
      if (user) tempData.verified = true;
      if (data?.email) {
        return tempData;
      } else return { status: false, message: "Wrong credential" };
    } catch (error) {}
  }

  async saveOtpToCollection(data: {
    email: string;
    otp: string;
  }): Promise<{ success: boolean; message: string } | void> {
    try {
      const { email, otp } = data;
      const result = await userModel.findOne({ email: email });
      if (!result) return { success: false, message: "not a valid email" };
      if (result?.active) {
        const update = await userModel.updateOne(
          { email },
          { $set: { otp: otp, otpVerified: false } }
        );
        if (update.modifiedCount)
          return { success: true, message: "otp generated" };
        else
          return { success: false, message: "user is inactive. contact admin" };
      } else
        return { success: false, message: "user is inactive. contact admin" };
    } catch (error) {}
  }

  async deleteUser(data: {
    name: string;
    email: string;
  }): Promise<string | void> {
    try {
      const { name, email } = data;
      const result = await userModel.updateOne(
        { email },
        { $set: { delete: true } }
      );

      if (result.upsertedCount > 0) {
        return "User deleted successfully";
      } else {
        return "User updated successfully";
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }

  async updateUserBasics(
    data: UserEntity_Model
  ): Promise<UserEntity_Model | void> {
    try {
      const { email } = data;
      if (data?.admin) data.role = "admin";
      else if (data?.trainer) data.role = "trainer";
      else if (data?.student) data.role = "student";
      else data.role = "user";
      const result = await userModel.updateOne({ email }, { $set: data });
      const user = await userModel.findOne({ email }, { password: 0 });
      if (user) return user;
      else return;
    } catch (error) {}
  }
  async getUsers(): Promise<void | UserEntity_Model[]> {
    const users = await userModel.find({ active: true });
    if (users) return users;
    else return;
  }
  async getActiveTrainers(): Promise<void | ValidHumanReturnTypes[]> {
    const result = await userModel.find(
      { role: "trainer", active: true },
      {
        humanid: 1,
        firstName: 1,
        lastName: 1,
        isAdmin: 1,
        active: 1,
        mob: 1,
        email: 1,
        web: 1,
        role: 1,
        deleted: 1,
        verified: 1,
        profileImage: 1,
        admin: 1,
        user: 1,
        student: 1,
        trainer: 1,
      }
    );
    const users = JSON.parse(JSON.stringify(result));

    return users;
  }
  async getStudentSubmission(data:{ email: string, startDate: Date, endDate: Date,designation:string }): Promise<
    void | (studentSubmission [])
  > {
    console.log(data,'at user Adapter')
    const result = await userModel.aggregate([
      {
        $match: {
          active: true,
          deleted: false,
          submission: { $ne: null },
        },
      },
       
    ]);
     
    const out: studentSubmission[] = result.map((user: UserEntity_Model) => {
      return {
        firstName: user.firstName,
        email: user.email,
        batchId: user.batchId,
        submission: user.submission,
      };
    });

    return out;
  }

  async getSubmissionDetails(
    email: string,
    password: string,
    googleAuth: boolean
  ): Promise<
    | UserEntity_Model
    | void
    | UserEntity_Model
    | { status: boolean; message: string }
  > {
    try {
      const user = await userModel.aggregate([
        {
          $match: { email },
        },
        {
          $lookup: {
            from: "studentbatches",
            localField: "batchId",
            foreignField: "batchId",
            as: "batch",
          },
        },
      ]);

      const data = JSON.parse(JSON.stringify(user[0]));
      delete data.password;
      if (user) data.verified = true;
      if (data?.email) {
        return data;
      } else return { status: false, message: "Wrong credential" };
    } catch (error) {}
  }
  async getActiveUsers(): Promise<void | ValidHumanReturnTypes[]> {
    const result = await userModel.find(
      { active: true },
      {
        humanid: 1,
        firstName: 1,
        lastName: 1,
        isAdmin: 1,
        active: 1,
        mob: 1,
        email: 1,
        web: 1,
        role: 1,
        deleted: 1,
        verified: 1,
        profileImage: 1,
        admin: 1,
        user: 1,
        student: 1,
        trainer: 1,
      }
    );
    const users = JSON.parse(JSON.stringify(result));

    return users;
  }
  async getWeeklyStudentssummary(): Promise<void | { week: string; count: number }[]> {
    try {
        const result = await userModel.aggregate([
            {
              $match: {
                role: 'student' // Filter for student documents (optional)
              }
            },
            {
              $group: {
                _id: "$week",
                 
                count: { $sum: 1 } // Count students in each week group
              }
            }
          ]);
         
          return result
    } catch (error) {
      console.log(error);
    }
  }
  async getBatchWiseStudentsList(): Promise<void | any[]> {
      try {
        const res = userModel.aggregate([
          {
            $match:{
               role:'student' 
            }
          },
          {
            $lookup:{
              from:'studentbatches',
              localField:'batchId',
              foreignField:'batchId',
              as :'batchName'
            }
          },
          {
            $unwind:'$batchName'
          }
          ,
          {
            $group:{
              _id:'$batchName.batchName',
              count:{$sum:1}
            }
          }
            
        ])

        return res
      } catch (error) {
        
      }  
  }
  async getDesignationWiseStaffList():Promise<void | any[] >{
   try {
    const data = designationDb.aggregate([
      {
        $match:{}
      },
      {
        $lookup:{
          from:'users',
          foreignField:'designation',
          localField:'id',
          as : 'employee'
        }
      },
      {
        $project:{
          Designation:1,
          id:1,
          shortHand:1,
          staffCount:{$size:'$employee'}
        }
      }
      ])
      return data;    
    }
     catch (error) {
    
   }
  }
  async applyPromocode(data: { email: string; promoCode: string;role:string,validity:Date }): Promise<void | { status: boolean; message: string; role: string; }> {
     
    const result = await userModel.updateOne({email:data.email,active:true},{$set:{role:data.role,promoCode:data.promoCode,designation:data.role == 'trainer'?'A000000008':'' ,user:data.role == 'user'?true:false,trainer:data.role == 'trainer'?true:false  ,student:data.role == 'student'?true:false ,Promo_validity_date:data.validity,isPromoCodeValid:true}})
    if(result.modifiedCount) { 
      return{status:true,message:`update success , your are now a ${data.role} user`,role:data.role}
    }
    else{
      return {status:false,message:'update Failed',role:'user'}
    }
  }
  
}

export default MongoDb_UserActivity;
