import { ValidHumanReturnTypes } from "../entity/ReturnTypes/validHuman";
import { VenueModels } from "../entity/models/venue_model";
import { UserRepository } from "../entity/repository/userRepository";
import { VenueRepository } from "../entity/repository/venueRepository";
import { UtilUseCases } from "../entity/usecases/UtilUseCases";

export class UtilitySocket implements UtilUseCases{
    constructor (
        private venueRepo:VenueRepository,
        private userRepo:UserRepository
    ){
        
    }
    async getActiveVenue():Promise<void | VenueModels[]>{
        const result = await this.venueRepo.getActiveVenue()
        return result;
    }
    async getActiveTrainers(): Promise<void | ValidHumanReturnTypes[]> {
       console.log('reached user socket')
        const result = await this.userRepo.getActiveTrainers();
        console.log(result ,'result at socket')
        return result;
    }
}