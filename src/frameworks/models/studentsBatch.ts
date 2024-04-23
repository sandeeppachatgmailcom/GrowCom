
import mongoose, { Schema, Model, Document } from "mongoose";
import { studentBatch } from "../../entity/models/studentBatch";

const schemaStudentsBatch:Schema<studentBatch&Document> =new  mongoose.Schema({
batchId :{type:String,required:true },
batchName:{type:String,required:true },
deleted:{type:Boolean,required:true,default:false},
active:{type:Boolean,required:true,default:true},
startDate:{type:Date,required:true,default:Date.now() },
endDate:{type:Date},
cordinator:{type:String},
trainer:{type:String},
location:{type:String},
venue:{type:String},
maxCapacity:{type:Number,required:true,default:0},
BatchType:{type:String,required:true,default:'remote'},
edited:{type:Boolean,required:true,default:false}
})

const studentBatchModel:Model<studentBatch & Document> = mongoose.model('studentBatch',schemaStudentsBatch)
export default studentBatchModel;