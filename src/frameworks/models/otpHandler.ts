import mongoose, { Schema, Model, Document } from "mongoose";
import { IOtpHandler } from "../../entity/ReturnTypes/otpHandler";

const schemaOtpHandler :Schema<IOtpHandler|Document>= new mongoose.Schema({
email:{type:String},
otp:{type:String},
expired:{type:Boolean},
verified:{type:Boolean},
createdTime:{type:Date}
})

const otpHandlerModel:Model<IOtpHandler|Document> = mongoose.model('otpHandler',schemaOtpHandler)
export default otpHandlerModel