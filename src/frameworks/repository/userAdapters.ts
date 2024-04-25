// Import necessary modules and types
import { UserAdapters } from "../../entity/repository/userRepository";
import { userEntity } from "../../entity/models/User";
import userModel from "../models/userModel";
import { createdUser } from "../../entity/returnTypes/createdUser";
import { validatedUser } from "../../entity/returnTypes/validatedUsed";

// Define and export UserAdapters class
class MongoDb_UserActivity implements UserAdapters {
    constructor() {
        console.log('reached repo');
    }

    async createUser(data: { name: string; email: string; password: string; otp:string ,googleAuth:boolean }): Promise<createdUser | void> {
        try {
            console.log('reached repository');
            const { name, email, password,otp,googleAuth } = data;
            console.log('reached crate',password) 
            const result = await userModel.updateOne({ email:email }, { $set: { firstName: name, email:email, password: password,otp:otp,otpVerified:googleAuth } }, { upsert: true });
            console.log(result, 'resulted');
            if (result.upsertedCount > 0) {
                return {name,email,password,status:true};
            } else {
                return {name,email,password,status:false};
            }
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }
    async findUser(data: { email: string; pasword: string; }): Promise<userEntity|void  > {
        try {
            console.log('reached find user')
            const {email} = data;
            const user = await userModel.findOne({email})
            if(user){
                return user
            } 
            else return 
            
        } catch (err) {
            console.log(err)
        }   
    }
    
    async login(data:{email:string,password:string,googleAuth:boolean}){
        try {
            const {email,password,googleAuth} = data
            if(googleAuth){
                const user = await userModel.findOne({email})
                if(user) user.verified=true
                if (user?.active){
                    return user
                }
            }
            else{
                const user = await userModel.findOne({email:email,password:password})
                console.log('reached authentication',password,user)
                if(user) user.verified=true
                if (user?.email){
                    return user
                }
                else return {status:false,message:'Wrong credential'}
            }
        } catch (error) {
             
        }
    } 

    async saveOtpToCollection(data:{email:string,otp:string}):Promise<{success:boolean,message:string}|void>{
        try {
                const {email,otp} = data
                const result = await userModel.findOne({email:email});
                if (!result) return {success:false,message:'not a valid email'} 
                if(result?.active){
                    const update = await userModel.updateOne({ email }, { $set: {otp:otp,otpVerified:false} });
                    if(update.modifiedCount) return {success:true,message:'otp generated'}
                    else return {success:false,message:'user is inactive. contact admin'}
                }
                else return  {success:false,message:'user is inactive. contact admin'}
        } catch (error) {
        }
    }

    async deleteUser(data: { name: string; email: string }): Promise<string | void> {
        try {
            const { name, email } = data;
            const result = await userModel.updateOne({ email }, { $set: { delete: true } });
            console.log(result, 'result');
            if (result.upsertedCount > 0) {
                return 'User deleted successfully';
            } else {
                return 'User updated successfully';
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user");
        }
    }

    async updateUserBasics(data:userEntity):Promise< userEntity| void> {
        try {

            const {email} = data
            if(data?.admin)data.role='admin'
            else if(data?.trainer) data.role='trainer'
            else if(data?.student) data.role = 'student'
            else data.role ='user'
            const result = await userModel.updateOne({email},{$set:data})
            const user = await userModel.findOne({email})
            if(user) return user
            else return

        } catch (error) {
            
        }  
         
    }

    async getUsers(): Promise<void | userEntity[]>{
        const users = await userModel.find({role:'Trainers',active:true})
        if (users) return users 
        else return
    }

}

// Export the UserAdapters class
export default MongoDb_UserActivity;
 