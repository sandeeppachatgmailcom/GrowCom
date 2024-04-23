import { UserController } from "../../interfaces/controller/userController";
import MongoDb_UserActivity from "../repository/userAdapters";
import { UserSocket } from "../../usecases/userUsecase";
import { Bcrypt_PasswordManager } from "../services/Bcrypt_PasswordManager";
import { NodeMailer } from "../services/NodeMailer";
import { Custom_OtpGenerator } from "../services/Custom_OtpGenerator";
import { MongoDb_AdminAdapter } from "../repository/adminAdapter";
import { AdminSocket } from "../../usecases/adminUseCases";
import { AdminController } from "../../interfaces/controller/adminController";


const otp_Adapter = new Custom_OtpGenerator()
const email_Adapter = new NodeMailer()
const password_Adapter = new Bcrypt_PasswordManager()
const user_adapter = new MongoDb_UserActivity()
const admin_Adapter = new MongoDb_AdminAdapter()

const adminSocket = new AdminSocket(admin_Adapter)
const userSocket = new UserSocket(user_adapter,password_Adapter,email_Adapter,otp_Adapter)



const adminController = new AdminController(adminSocket)
const userController = new UserController(userSocket)

export{userController,adminController };