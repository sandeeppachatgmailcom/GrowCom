import mongoose, { Model, Schema } from "mongoose"
import { Document } from "mongoose"
import { Event_Model } from "../../entity/models/eventModel"

const eventSchema :Schema <Event_Model& Document> =new mongoose.Schema({
    eventName:{type:String,required:true,unique:true},
    eventId:{type:String,required:true,unique:true},
    active:{type:Boolean,required:true,default:true},
    deleted:{type:Boolean,required:true,default:false},
    eventType:{type:String,required:true,default:'student'}
})

const events_Model :Model<Event_Model & Document> = mongoose.model('event',eventSchema)
export default events_Model;
