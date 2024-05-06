import mongoose, { Document, Model, Schema } from "mongoose";
import { Task_model } from "../../entity/models/task";
const taskSchema :Schema<Task_model & Document> = new  mongoose.Schema({
    taskId:{type:String,unique:true},
    taskName:{type:String,unique:true},
    taskSub:{type:String,unique:true},
    taskDiscription:{type:String},
    taskLink:{type:String},
    taskType:{type:String},
    repeat:{type:Boolean},
    deleted:{type:Boolean},
    active:{type:Boolean},
    
})

const task_db :Model<Task_model & Document> = mongoose.model('task',taskSchema)
export default task_db;