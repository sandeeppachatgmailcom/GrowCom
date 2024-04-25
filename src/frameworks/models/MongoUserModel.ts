import mongoose, { Model, Schema , Document, Mongoose } from "mongoose";
import { SerialNumbers } from "../../entity/models/serialNumbers"; 


const SchemaSerialNumber:Schema<SerialNumbers & Document>  =new  mongoose.Schema({
    collectionName:{type:String}, 
    prefix:{type:String},
    nextNum:{type:Number},
    deleted:{type:Boolean},
    edited:{type:Boolean},
    active:{type:Boolean}
})

const MongoSerialNumModel :Model < SerialNumbers & Document>  = mongoose.model('serialNumber',SchemaSerialNumber)

export default MongoSerialNumModel;