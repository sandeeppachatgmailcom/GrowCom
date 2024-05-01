import mongoose, { Model, Schema , Document, Mongoose } from "mongoose";
import { SerialNumbers_Model } from "../../entity/models/SerialNumbers";  


const SchemaSerialNumber:Schema<SerialNumbers_Model & Document>  =new  mongoose.Schema({
    collectionName:{type:String}, 
    prefix:{type:String},
    nextNum:{type:Number},
    deleted:{type:Boolean},
    edited:{type:Boolean},
    active:{type:Boolean}
})

const MongoSerialNumModel :Model < SerialNumbers_Model & Document>  = mongoose.model('serialNumber',SchemaSerialNumber)

export default MongoSerialNumModel;