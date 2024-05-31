import { Chat_Message_model } from "../../entity/models/Chat_Message_model";
import { Conversation_Model } from "../../entity/models/conversations_Model";
import { conversations_Repo } from "../../entity/repository/conversations_Repo";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import chatMessageDb from "../models/Chat_Message_Db";
import conversationDb from "../models/conversationDb";


export default class MongoConversationAdapter implements conversations_Repo{
    constructor(
        private indexRepo: SerialNumbersRepository

    ) {}

    async createConversation(data: { senderId: string; receiverId: string; }): Promise<void | Conversation_Model> {
        
        try {
            const result = await conversationDb.find()
            console.log(result,'resultresultresultresultresultresultresult')
            if(result){
                const isExist =  result.filter((item:any)=>{

                    return item.members.includes(data.senderId) && item.members.includes(data.receiverId) 
                    })
                console.log(isExist,'dadadadaddaddadadad')
                if(!isExist.length){
                    console.log('first')
                    const converationId = await this.indexRepo.getIndex( {collectionName:'conversation'})
                    console.log(converationId,'converationId')
                    const converSation =await  conversationDb.create({converationId:converationId.serialNumber, members:[data.senderId,data.receiverId]})
                    console.log(converSation,'heeeeeeeeeeeeee')
                    return converSation
                }
                else {
                    return isExist[0]
                }
               

            }
        } catch (error) {
            
        }
    }
    async saveMessage(data: { senderMessage: string; receiverMessage: string; TransDateTime: Date; receiverId: string; senderId: string; conversationId: string; }): Promise<void | Chat_Message_model> {
         try {
                const message =await  chatMessageDb.create(data)
                console.log(message,'message' )
                return(message)

         } catch (error) {
            
         }
    }
    async getAllMessage(data: { converationId: string; }): Promise<void | Chat_Message_model[]> {
            const message = await chatMessageDb.find({conversationId:data.converationId})
            return message;
    }
     
    
} 