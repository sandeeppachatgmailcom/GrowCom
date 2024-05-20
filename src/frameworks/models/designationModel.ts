

import mongoose, { Model, Schema } from "mongoose";
import { DesignationModel } from "../../entity/models/designationModel";

const designationSchema :Schema<DesignationModel & Document > = new mongoose.Schema({
Designation:{type:String},
shortHand:{type:String},
id:{type:String},
reportingDesignation:{type:String}
})

const designationDb :Model<DesignationModel & Document> = mongoose.model('designation',designationSchema)

export default designationDb

const data:DesignationModel ={
    Designation:'Director',
    id:'D001',
    reportingDesignation:'Company',
    shortHand:'Dir'
}
 designationDb.updateOne({$set:data},{upsert:true})
 