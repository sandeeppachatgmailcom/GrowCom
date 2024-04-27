import { SerialNumbers_Model } from "../../entity/Models/SerialNumbers";
import { SerialNumbersRepository } from "../../entity/Repository/SerialNumberRepository";
import MongoSerialNumModel from "../models/serialNumber_Model";

export class Mongo_Serial_Number implements SerialNumbersRepository{
    
        async getIndex(data: { collectionName: string; }): Promise<{ serialNumber: string;active:boolean }> {
            
        const collectionName={data}
        const result  = await MongoSerialNumModel.findOne({collectionName:collectionName})
        const { prefix, nextNum, deleted,edited, active} = result as SerialNumbers_Model
       
        if (active){
            let  serialNumber = prefix +nextNum  
            !serialNumber?serialNumber='':serialNumber
            const updateDb = await MongoSerialNumModel.updateOne({collectionName:collectionName},{$set:{prefix,deleted,edited, active ,nextNum:nextNum+1,collectionName}} )
            return {serialNumber,active}
        }
        else{
            const serialNumber = ''
            return{serialNumber,active}
        }   
             
    }
}