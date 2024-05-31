export interface Chat_Message_model {
    senderMessage?:string
    receiverMessage?:string,
    TransDateTime: string,
    receiverId:string,
    senderId:string,
    conversationId:string
}