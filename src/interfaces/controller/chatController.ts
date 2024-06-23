import { Next, Req, Res } from "../../entity/Types_1/ServerTypes";
import { ChatUseCase } from "../../entity/usecases/ChatUseCase";


export class ChatController {
    constructor(
        private chatSocket :ChatUseCase
    ){

    }
    async createConversation(req:Req,res:Res,next:Next){
        try {
            
            const conversation = await this.chatSocket.createConversation(req.body)
            res.json(conversation)
        } catch (error) {
            
        }
    }
    async saveMessage(req:Req,res:Res,next:Next){
        const message = await this.chatSocket.saveMessage(req.body)
        console.log(message,'controller')
        res.json(message)
    }
}