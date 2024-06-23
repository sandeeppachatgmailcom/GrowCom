import { UserController } from "../../interfaces/controller/userController";
import MongoDb_UserActivity from "../repository/userAdapters";
import { UserSocket } from "../../usecases/userSocket";
import { Bcrypt_PasswordAdapter } from "../services/Bcrypt_PasswordAdapter";
import { NodeMailer_Adapter } from "../services/NodeMailer_Adapter";
import { Custom_OtpAdapter } from "../services/Custom_OtpAdapter";
import { MongoDb_AdminAdapter } from "../repository/adminAdapter";
import { AdminSocket } from "../../usecases/adminS--ocket";
import { AdminController } from "../../interfaces/controller/adminController";
import NpmModule from "../webServer/nodeServer";
import MongoDB from "../webServer/mongoDB"; 
import { Mongo_StudentBatchAdapter } from "../repository/studentsBatch";
import { Mongo_Serial_Number } from "../repository/monGoSerialnumberAdapter";
import { MongoVenueAdapter } from "../repository/MongoVenueAdapter";
import { UtilitySocket } from "../../usecases/utilitySocket";
import { UtilityController } from "../../interfaces/controller/utilityController";
import { Mongo_EventRepository } from "../repository/mongo_EventRepository";
import { TrainerController } from "../../interfaces/controller/trainerController";
import { TrainerSocket } from "../../usecases/trainerSocket";
import { GeneralUtils } from "../../interfaces/utils/GeneralUtils";
import { MongoTaskRepository } from "../repository/mongoTaskRepository";
import { MongoScheduledTask } from "../repository/mongoScheduledTaskAdapter";
import { StudentsController } from "../../interfaces/controller/studentsController";
import { StudentSocket } from "../../usecases/studentSocket";
//Models
import submission_Db from "../models/submission_Model";
import { MongoSubmissionAdapter } from "../repository/mongoSubmissionAdapter";
import designationDb from "../models/designationModel";
import { Mongo_DesignationRepository } from "../repository/Mongo_DesignationRepository";
import { ChatController } from "../../interfaces/controller/chatController";
import ChatSocket from "../../usecases/ChatSocket";
import MongoConversationAdapter from "../repository/mongoConverationAdapter";
import Crone_ScheduleTaskManager from "../services/Crone_ScheduleTaskManager";
import { JwtToken_Adapter } from "../services/JwtToken_Adapter";  
import UpdatePromoCodeSocket from "../../usecases/commonUseCases/updatePromoCodeSocket";


//Db Adapters
const Designation = designationDb


//Repo Adapters 


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
const taskAdapter = new MongoTaskRepository(serialNumberAdapter)
const scheduledTaskAdapter = new MongoScheduledTask()
const submissionRepo = new MongoSubmissionAdapter(serialNumberAdapter)
const DesignationAdapter = new Mongo_DesignationRepository()
const conversationAdapter = new MongoConversationAdapter(serialNumberAdapter)
const SchedulerAdapter = new Crone_ScheduleTaskManager(scheduledTaskAdapter)
const tokenService = new JwtToken_Adapter(user_adapter)


// sockets 
const utilitySocket = new UtilitySocket(venueAdapter,user_adapter,studentBatchAdapter,eventsAdapter,taskAdapter,DesignationAdapter,scheduledTaskAdapter)
const adminSocket = new AdminSocket(admin_Adapter,studentBatchAdapter,venueAdapter,eventsAdapter,generalAdapter,taskAdapter )
const userSocket = new UserSocket(user_adapter,password_Adapter,email_Adapter,otp_Adapter)
const trainerSocket = new TrainerSocket(eventsAdapter,generalAdapter,serialNumberAdapter,studentBatchAdapter,scheduledTaskAdapter,user_adapter,SchedulerAdapter)
const studentSocket = new StudentSocket(scheduledTaskAdapter,user_adapter,submissionRepo,serialNumberAdapter,studentBatchAdapter)
const chatUseCase = new ChatSocket(conversationAdapter)
const PromoCodeSocket = new UpdatePromoCodeSocket(user_adapter)

// router controllers 
const adminController = new AdminController(adminSocket,utilitySocket)
const userController = new UserController(userSocket,PromoCodeSocket)
const utilsController = new UtilityController(utilitySocket)
const trainerController = new TrainerController(trainerSocket)
const studentsController = new StudentsController(studentSocket)
const chatController = new ChatController(chatUseCase)

//servers 
const appServer = new NpmModule()
const dbServer = new MongoDB()
export{tokenService, userController,adminController,utilsController,appServer,dbServer,trainerController,studentsController,chatController};