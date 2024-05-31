import mongoose, { Document, Model, Schema } from "mongoose";
import { Chat_Message_model } from "../../entity/models/Chat_Message_model";

const ChatMessageschema :Schema<Chat_Message_model & Document> = new mongoose.Schema({
        senderMessage:{type:String},
        receiverMessage:{type:String},
        TransDateTime: {type:String},
        receiverId:{type:String},
        senderId:{type:String},
        conversationId:{type:String}
})


const chatMessageDb :Model<Chat_Message_model & Document> = mongoose.model('ChatMessage',ChatMessageschema)
export default chatMessageDb