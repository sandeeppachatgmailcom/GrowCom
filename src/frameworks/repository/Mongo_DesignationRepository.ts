
import { DesignationModel } from "../../entity/models/designationModel";
import { DesignationRepository } from "../../entity/repository/DesignationRepository";
import designationDb from "../models/designationModel";


export class Mongo_DesignationRepository  implements DesignationRepository{
    async realAllDesination(): Promise<DesignationModel[]> {
         const result = await  designationDb.find()
         return result;
    }
}
