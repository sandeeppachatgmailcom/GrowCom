import mongoose, {Model , Document, Schema } from "mongoose";
import { Conversation_Model } from "../../entity/models/conversations_Model";


const schemaConversation :Schema<Conversation_Model & Document  > =new  mongoose.Schema({
    converationId:{type:String},
    members:Array,
    timeStamps:{type:Boolean,default:true},
},{ timestamps: true })

const conversationDb :Model <Conversation_Model & Document> = mongoose.model('conversation',schemaConversation)

export default conversationDb