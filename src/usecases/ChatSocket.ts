import { Chat_Message_model } from "../entity/models/Chat_Message_model";
import { Conversation_Model } from "../entity/models/conversations_Model";
import { conversations_Repo } from "../entity/repository/conversations_Repo";
import { ChatUseCase } from "../entity/usecases/ChatUseCase";

export default class ChatSocket implements ChatUseCase{
    constructor (
        private conversationRepo:conversations_Repo

    ){

    }
    async createConversation(data: { senderId: string; receiverId: string; }): Promise<void | {conversation:Conversation_Model,messages:Chat_Message_model[]}> {
            try {
                const converSation = await this.conversationRepo.createConversation(data)
                
                if(converSation){
                    const messages  = await this.conversationRepo.getAllMessage({converationId:converSation.converationId})
                
                return {conversation:converSation,messages:messages};
                }
            } catch (error) {
                
            }
    }
    async saveMessage(data: { senderMessage: string; receiverMessage: string; TransDateTime: Date; receiverId: string; senderId: string; conversationId: string; }): Promise<void | Chat_Message_model> {
        try {
            const message = await this.conversationRepo.saveMessage(data)
            
            if(message){
                return message;
            }
            else{
                return
            }
        } catch (error) {
            
        }
    }
} 