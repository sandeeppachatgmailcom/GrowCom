import UserAdapters from "../../frameworks/repository/userAdapters";
import { Route, Req, Res, Next } from "../../entity/types/serverTypes";
import { userSocket } from "../../entity/usecases/userInterface";
import { userEntity } from "../../entity/models/userEntity";

export class UserController {
  private userSocket: userSocket;

  constructor(userSocket: userSocket) {
      this.userSocket = userSocket;
  }

  async createUser(req: Req, res: Res, next: Next) {
    try {
      const { name, email, password,googleAuth } = req.body;
      const exist = await this.userSocket.findUser(email, next);

      if (this.isValidEmail(email) && this.validatePassword(password)) {
        if (!exist?.email) {
          console.log(exist, "exist");
          const result = await this.userSocket.createUser(
            name,
            email,
            password,
            googleAuth,
            next
          );
          const user = await this.userSocket.findUser(email, next);
          res.status(200).json({ ...user, success: true });
        } else {
          res.json({ message: "email already exist" });
        }
      } else res.status(400).json({ error: "invalid email or password " });
    } catch (error) {}
  }

  async validateOtp(req: Req, res: Res, next: Next) {
    try {
      const { email, otp,resetPaaword } = req.body;
      const result = await this.userSocket.findUser(email, next);
      if (result) {
        if (result?.otp == otp) {
          result.otpVerified  =  true;
          result.otp = '';
          const updateResult = await this.userSocket.updateUserBasics(result)
          const reply = JSON.parse(JSON.stringify(updateResult))
          reply.resetPaaword =  resetPaaword
           
          res.status(200).json(reply)
        }
        else res.status(200).json({otpVerified:false,message:'invalid credentials'})
      }
      else res.status(401).json({status:false,message:'invalid credentials'})
    } catch (error) {
    }
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password, googleAuth } = req.body;
      if (this.isValidEmail(email)) {
        const result = await this.userSocket.login(
          email,
          password,
          googleAuth,
          next
        );
        
        console.log(result,'result at controller ')
        const data  = JSON.parse(JSON.stringify(result))
        if (data?.active ){ 
         
          const data = JSON.parse(JSON.stringify(result))
          req?.body?.token? res.cookie('manGrow', req.body.token.token ):''
          req?.body?.token? data.password =req.body.token.token as string :''    
          res.status(200).json(data);
        }

        else{
          const data = JSON.parse(JSON.stringify(result))
          res.status(200).json(data);
        }
      }
    } catch (error) {}
  }

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  validatePassword(password: string) {
    if (password.length < 8) {
      return {
        status: false,
        message: "Password must be at least 8 characters long",
      };
    }
    // Validate if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return {
        status: false,
        message: "Password must contain at least one uppercase letter",
      };
    }
    // Validate if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return {
        status: false,
        message: "Password must contain at least one lowercase letter",
      };
    }
    // Validate if password contains at least one number
    if (!/\d/.test(password)) {
      return {
        status: false,
        message: "Password must contain at least one number",
      };
    }
    // Validate if password contains at least one special character
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return {
        status: false,
        message: "Password must contain at least one special character",
      };
    }
    // If no errors, return an empty string
    return { status: true, message: "" };
  }
  getUsers(req:Req,res:Res,next:Next){

  }
  async savebasicProfile(req:Req,res:Res,next:Next){
    const user =await  this.userSocket.updateUserBasics(req.body)
    res.json(user)
  }
  async forgotPassword(req:Req,res:Res,next:Next){
    const {name,email} = req.body
    const otp =await this.userSocket.forgotOtp(email,name)
    const out = JSON.parse(JSON.stringify(otp))
    out.changePassword=true
    res.json(out)
  }
  async resetPassword (req:Req,res:Res,next:Next){
    const {password ,email } = req.body
    const result= await this.userSocket.resetPassword(email,password)
    const reply = JSON.parse(JSON.stringify(result))
    reply.changePassword=true
    console.log(reply,'reply')
    res.status(200).json(reply)
  }  
}
