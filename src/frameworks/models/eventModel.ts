import mongoose, { Model, Schema } from "mongoose"
import { Document } from "mongoose"
import { Event_Model } from "../../entity/models/eventModel"
import { audienceType, priority, repeat } from "../../entity/enum/enum"

const eventSchema :Schema <Event_Model& Document> =new mongoose.Schema({
    eventName:{type:String,required:true,unique:true},
    eventId:{type:String,required:true,unique:true},
    active:{type:Boolean,required:true,default:true},
    deleted:{type:Boolean,default:false},
    staffInCharge:{type:String},
    repeat:{type:String,enum:Object.keys(repeat),default:repeat.none},
    location:{type:String },
    timeFixed:{type:Boolean,default:false},
    startDateTime:{type:String},
    endDateTime:{type:String},
    taskID:{type:String},
    audienceType:{type:String,enum:Object.keys(audienceType),default:audienceType.inhouse},
    prority:{type:String,enum:Object.keys(priority),default:priority.high},  
    description:{type:String},
    startDate:{type:Date},
    cancelled:{type:Boolean},
    dayName:{type:String},
    monthDay:{type:String},
    yearDay:{type:String},

})

const events_Model :Model<Event_Model & Document> = mongoose.model('event',eventSchema)
export default events_Model;
