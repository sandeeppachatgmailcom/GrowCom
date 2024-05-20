import mongoose, { Document, Model, Schema } from "mongoose";
import { Task_model } from "../../entity/models/taskModel";
const taskSchema :Schema<Task_model & Document> = new  mongoose.Schema({
    taskId:{type:String,unique:true},
    taskName:{type:String,unique:true}, 
    taskSub:{type:String},
    taskDiscription:{type:String},
    taskLink:{type:String},
    taskType:{type:String},
    repeat:{type:Boolean},
    deleted:{type:Boolean}, 
    active:{type:Boolean},
    Validation:{type:Boolean},
    validateBy:{type:String},
    series:{type:Boolean},
    nextTaskId:{type:String},
    possiblePostpone:{type:Number},
    associatedPrograms:[],
    
})

const task_db :Model<Task_model & Document> = mongoose.model('task',taskSchema)
export default task_db;

