import mongoose, { Document, Model, Schema  } from "mongoose";
import { ScheduledTask_Model } from "../../entity/models/scheduledTask_Model";
 

const scheduleMongoSchema :Schema<ScheduledTask_Model & Document> = new mongoose.Schema(
    {
    ScheduledTaskID:{type:String},    
    eventName:{type:String},
    scheduledDate:{type:Date},
    staffInCharge:{type:String},
    staffDesignation:{type:String},
    location:{type:String},
    timeFixed:{type:Boolean},
    startDateTime:{type:String},
    endDateTime:{type:String},
    taskID:{type:String},
    eventId:{type:String},
    cancelled:{type:Boolean},
    active:{type:Boolean},
    deleted:{type:Boolean},
    audience:{type:{}},
    startDate:{type:Date},
    description:{type:String},
    dayName:{type:String},
    monthDay:{type:String},
    yearDay:{type:String},
    Title:{type:String},
    details:{type:String},
    link:{type:String},
    audienceType:{type:String},
    prority:{type:String},
    repeat:{type:String},
    dayTitle:{type:String},
    dayDiscription:{type:String},
    matchedTasks:{type:[]},
    createdDate:{type:Date},
    submissionDate:{type:Date}
    }
)

const scheduledTask_DB :Model<ScheduledTask_Model & Document> = mongoose.model('scheduledTask',scheduleMongoSchema)
export default scheduledTask_DB;