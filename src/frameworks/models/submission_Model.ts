import mongoose, { Document, Model, Schema } from "mongoose";
import { Submission__Model } from "../../entity/models/SubmissionModel";

const submissionSchema :Schema<Submission__Model  & Document>= new mongoose.Schema({
  submissionId:{type:String},
  taskid:{type:String},
  studentId:{type:String},
  scheduledTaskId:{type:String},
  WriteTask:{type:String},
  Reading:{type:String},
  Speaking:{type:String},
  deleted:{type:Boolean},
  active:{type:Boolean}
})

const submission_Db:Model<Submission__Model  & Document >= mongoose.model('submission',submissionSchema)
export default submission_Db