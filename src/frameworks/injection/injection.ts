import { UserController } from "../../interfaces/controller/userController";
import MongoDb_UserActivity from "../repository/userAdapters";
import { UserSocket } from "../../usecases/UserSocket";
import { Bcrypt_PasswordAdapter } from "../services/Bcrypt_PasswordAdapter";
import { NodeMailer_Adapter } from "../services/NodeMailer_Adapter";
import { Custom_OtpAdapter } from "../services/Custom_OtpAdapter";
import { MongoDb_AdminAdapter } from "../repository/adminAdapter";
import { AdminSocket } from "../../usecases/AdminSocket";
import { AdminController } from "../../interfaces/controller/adminController";
import NpmModule from "../webServer/nodeServer";
import MongoDB from "../webServer/mongoDB"; 
import { Mongo_StudentBatchAdapter } from "../repository/studentsBatch";
import { Mongo_Serial_Number } from "../repository/monGoSerialnumberAdapter";
import { MongoVenueAdapter } from "../repository/MongoVenueAdapter";
import { UtilitySocket } from "../../usecases/UtilitySocket";
import { UtilityController } from "../../interfaces/controller/utilityController";
import { Mongo_EventRepository } from "../repository/eventsRepository";
import { TrainerController } from "../../interfaces/controller/trainerController";
import { TrainerSocket } from "../../usecases/trainerSocket";
import { GeneralUtils } from "../../interfaces/utils/GeneralUtils";

// service adapters
const otp_Adapter = new Custom_OtpAdapter()
const email_Adapter = new NodeMailer_Adapter()
const password_Adapter = new Bcrypt_PasswordAdapter()

const user_adapter = new MongoDb_UserActivity()
const admin_Adapter = new MongoDb_AdminAdapter()
const serialNumberAdapter = new Mongo_Serial_Number()
const studentBatchAdapter = new Mongo_StudentBatchAdapter(serialNumberAdapter)
const venueAdapter = new MongoVenueAdapter(serialNumberAdapter)
const eventsAdapter = new Mongo_EventRepository(serialNumberAdapter)
const generalAdapter = new GeneralUtils()

// sockets 
const utilitySocket = new UtilitySocket(venueAdapter,user_adapter,studentBatchAdapter,eventsAdapter)
const adminSocket = new AdminSocket(admin_Adapter,studentBatchAdapter,venueAdapter,eventsAdapter,generalAdapter)
const userSocket = new UserSocket(user_adapter,password_Adapter,email_Adapter,otp_Adapter)
const trainerSocket = new TrainerSocket(eventsAdapter,generalAdapter)

//router controllers 
const adminController = new AdminController(adminSocket,utilitySocket )
const userController = new UserController(userSocket)
const utilsController = new UtilityController(utilitySocket)
const trainerController = new TrainerController(trainerSocket)

//servers 
const appServer = new NpmModule()
const dbServer = new MongoDB()
export{userController,adminController,utilsController,appServer,dbServer,trainerController};