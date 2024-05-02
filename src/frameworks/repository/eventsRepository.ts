import { Event_Model } from "../../entity/models/eventModel";
import { EventTypes } from "../../entity/ReturnTypes/events";
import { EventsRepository } from "../../entity/repository/eventsRepository";
import events_Model from "../models/eventModel";
import { FailedStatus_reply } from "../../entity/Types/failedStatus";

import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";

export class Mongo_EventRepository implements EventsRepository{
    constructor(
        private indexRepo:SerialNumbersRepository
    ){

    }
    async creatAndEditEvents(data: Event_Model):Promise<void | Event_Model & FailedStatus_reply > {
       try {
            if(!data.eventId){
                const exist = await events_Model.findOne({eventName:data.eventName,deleted:false})
                if(exist){
                    return {status:true,message:'event creation success ',...JSON.parse(JSON.stringify(event))  }
                }
                else{
                    const eventIndex = await this.indexRepo.getIndex( {collectionName:'eventMaster'})
                    
                    data.eventId = eventIndex.serialNumber
                    console.log(eventIndex,eventIndex.serialNumber,data,'eventIndexeventIndex')
                    const insert =await events_Model.updateOne({eventId:eventIndex.serialNumber},{$set:data},{upsert:true})
                    console.log(insert,eventIndex.serialNumber,'insert')
                    const event = await events_Model.findOne({eventId:data.eventId})
                    return {status:true,message:'event creation success ',...JSON.parse(JSON.stringify(event))   }

                }
            }
            else{
                const newEvent =await events_Model.findOne({eventName:data.eventName,deleted:false,eventId:{$ne:data.eventId}})
                if(newEvent){
                    return {status:false,message:'another event already in this same name',...JSON.parse(JSON.stringify(newEvent))   }
                }
                else{
                    await events_Model.updateOne({eventName:data.eventName,deleted:false,eventId:data.eventId},{$set:data})
                    const result = await events_Model.findOne({eventId:data.eventId})
                    return {status:false,message:'event Creation success',...JSON.parse(JSON.stringify(result))}
                }

            }
            return
       } catch (error) {

       }  
    }
    async deleteEvents(data: Event_Model): Promise<void | EventTypes & FailedStatus_reply> {
        try {
            const result =await events_Model.updateOne({eventId:data.eventId},{$set:{deleted:true}})
            const reply = await events_Model.findOne({eventId:data.eventId})
            console.log(reply)
            return{status:true,message:'event deletion success',...JSON.parse(JSON.stringify(reply))}
        } catch (error) {
            
        }
    }
    async readActiveEvents(): Promise<void | Event_Model[]> {
        const reply = await events_Model.find({deleted:false})
        console.log(reply)
        if (reply) return reply;
        else return
    }
}