import { SerialNumbers_Model } from "../models/SerialNumbersModel";

export interface SerialNumbersRepository{
    getIndex(data:{collectionName:string}):Promise<{serialNumber:string}>
}