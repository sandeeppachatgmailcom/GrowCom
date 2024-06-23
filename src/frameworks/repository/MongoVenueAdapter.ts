import { VenueModels } from "../../entity/models/venue_model";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import { FailedStatus_reply } from "../../entity/Types_1/failedStatus";
import { VenueRepository } from "../../entity/repository/venueRepository";
import venuModel from "../models/venueModel";


export class MongoVenueAdapter implements VenueRepository{
    constructor(
        private indexRepo: SerialNumbersRepository,
    ){

    }
    async getActiveVenue(): Promise<VenueModels[]> {
        const venue = await venuModel.find({deleted:false},{venueName:1,venueId:1,_id:0}) 
       
        return venue   
    }
    async createVenue(data:{venueName:string}):Promise<VenueModels & FailedStatus_reply|void> {
        const {venueName } = data
        
        const venue = await venuModel.findOne({venueName:venueName})
       
        if(venue){
            return {...JSON.parse(JSON.stringify(venue)),status:false, message:'Venu in this name already exist'  }
             
        }
        else{
            let venueId :any = await this.indexRepo.getIndex({collectionName:'venue'})
           
            const newVenue  = {
                active:true,
                deleted:false,
                venueName:venueName,
                venueId:venueId.serialNumber
            }
             
             const venue = await venuModel.updateOne({venueName:venueName},{$set:newVenue},{upsert:true})
                return {...newVenue,status:true, message:'Save Success'  }
        }
    }
}