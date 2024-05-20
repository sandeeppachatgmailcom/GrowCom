import { SerialNumbers_Model } from "../../entity/models/SerialNumbersModel";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import MongoSerialNumModel from "../models/serialNumber_Model";

export class Mongo_Serial_Number implements SerialNumbersRepository{
    
        async getIndex(data: { collectionName: string; }): Promise<{serialNumber:string;active:boolean}> {
         console.log('reached index register')   
        const collectionName=data.collectionName
        let result  = await MongoSerialNumModel.findOne({collectionName:collectionName})
        console.log( result, 'result in index')
        const { prefix, nextNum, deleted,edited, active} = result as SerialNumbers_Model
       
        if (active){
            let  serialNumber = prefix +nextNum  
            !serialNumber?serialNumber='':serialNumber
            const updateDb = await MongoSerialNumModel.updateOne({collectionName:collectionName},{$inc:{nextNum:1}} )
            return {serialNumber,active}
        }
        else{
            const serialNumber = ''
            return{serialNumber,active}
        }   
             
    }
}