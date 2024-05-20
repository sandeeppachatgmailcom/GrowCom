import { DesignationModel } from "../models/designationModel";

export interface DesignationRepository {
    realAllDesination():Promise<DesignationModel[]>
}