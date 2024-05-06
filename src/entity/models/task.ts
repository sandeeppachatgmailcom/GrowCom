import { Activity_Types } from "../ReturnTypes/activityTypes";

export interface Task_model{
    taskId?:string;
    taskName?:string;
    taskSub?:string;
    taskDiscription?:string;
    taskLink?:string;
    taskType?:Activity_Types
    repeat?:boolean;
    deleted?:boolean;
    active?:boolean;
    }