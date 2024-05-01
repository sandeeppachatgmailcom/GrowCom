import { SerialNumbers_Model } from "../models/SerialNumbers";

export interface SerialNumbersRepository{
    getIndex(data:{collectionName:string}):Promise<{serialNumber:string}>
}