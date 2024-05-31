import { Chat_Message_model } from "../models/Chat_Message_model";
import { Conversation_Model } from "../models/conversations_Model";

export interface ChatUseCase {
    createConversation(data: { senderId: string; receiverId: string; }): Promise<void |  {conversation:Conversation_Model,messages:Chat_Message_model[]}>  
    saveMessage(data:{senderMessage:string, receiverMessage:string, TransDateTime: Date, receiverId:string, senderId:string, conversationId:string}):Promise<void|Chat_Message_model>
    getAllMessage(data:{converationId:string}):Promise<void | Chat_Message_model[]>
}