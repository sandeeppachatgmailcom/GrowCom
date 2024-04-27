import { UserController } from "../../interfaces/controller/userController";
import MongoDb_UserActivity from "../repository/userAdapters";
import { UserSocket } from "../../usecases/userUsecase";
import { Bcrypt_PasswordAdapter } from "../services/Bcrypt_PasswordAdapter";
import { NodeMailer_Adapter } from "../services/NodeMailer_Adapter";
import { Custom_OtpAdapter } from "../services/Custom_OtpAdapter";
import { MongoDb_AdminAdapter } from "../repository/adminAdapter";
import { AdminSocket } from "../../usecases/adminUseCases";
import { AdminController } from "../../interfaces/controller/adminController";
import NpmModule from "../webServer/nodeServer";
import MongoDB from "../webServer/mongoDB"; 
import { Mongo_StudentBatchAdapter } from "../repository/studentsBatch";
import { Mongo_Serial_Number } from "../repository/monGoSerialnumberAdapter";

// adapters
const otp_Adapter = new Custom_OtpAdapter()
const email_Adapter = new NodeMailer_Adapter()
const password_Adapter = new Bcrypt_PasswordAdapter()
const user_adapter = new MongoDb_UserActivity()
const admin_Adapter = new MongoDb_AdminAdapter()
const serialNumberAdapter = new Mongo_Serial_Number()
const studentBatchAdapter = new Mongo_StudentBatchAdapter(serialNumberAdapter)



// sockets 
const adminSocket = new AdminSocket(admin_Adapter,studentBatchAdapter)
const userSocket = new UserSocket(user_adapter,password_Adapter,email_Adapter,otp_Adapter)

//router controllers 
const adminController = new AdminController(adminSocket)
const userController = new UserController(userSocket)

//servers 
const appServer = new NpmModule()
const dbServer = new MongoDB()
export{userController,adminController,appServer,dbServer};