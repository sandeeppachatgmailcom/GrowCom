import { Activity_Types } from "../ReturnTypes/activityTypes";

export interface Task_model{
    taskId?:string;
    taskName?:string;
    taskSub?:string;
    taskDiscription?:string;
    taskLink?:string;
    taskType?:string
    repeat?:boolean;
    deleted?:boolean;
    active?:boolean;
    Validation?:boolean;
    validateBy?:string;
    series:boolean;
    nextTaskId:string
    possiblePostpone:number;
    associatedPrograms:object;
    }