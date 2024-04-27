import { SerialNumbers_Model } from "../Models/SerialNumbers";

export interface SerialNumbersRepository{
    getIndex(data:{collectionName:string}):Promise<{serialNumber:string}>
}