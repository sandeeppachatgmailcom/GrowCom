import { VenueModels } from "../../entity/models/venue_model";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import { FailedStatus_reply } from "../../entity/Types/failedStatus";
import { VenueRepository } from "../../entity/repository/venueRepository";
import venuModel from "../models/venueModel";


export class MongoVenueAdapter implements VenueRepository{
    constructor(
        private indexRepo: SerialNumbersRepository,
    ){

    }
    async getActiveVenue(): Promise<VenueModels[]> {
        const venue = await venuModel.find({deleted:false},{venueName:1,venueId:1,_id:0}) 
        console.log(venue,'venue details ')
        return venue   
    }
    async createVenue(data:{venueName:string}):Promise<VenueModels & FailedStatus_reply|void> {
        const {venueName } = data
        console.log('reached repository')
        const venue = await venuModel.findOne({venueName:venueName})
        console.log('new enuew')
        if(venue){
            return {...JSON.parse(JSON.stringify(venue)),status:false, message:'Venu in this name already exist'  }
            console.log(  'new enuew')
        }
        else{
            let venueId :any = await this.indexRepo.getIndex({collectionName:'venue'})
            console.log(venueId, 'new enuew')
            const newVenue  = {
                active:true,
                deleted:false,
                venueName:venueName,
                venueId:venueId.serialNumber
            }
            console.log(newVenue,'newVenue')
             const venue = await venuModel.updateOne({venueName:venueName},{$set:newVenue},{upsert:true})
                return {...newVenue,status:true, message:'Save Success'  }
        }
    }
}