import { FailedStatus_reply } from "../Types_1/failedStatus";
import { Task_model } from "../models/taskModel";

export interface TaskRepository{
    crateTask(data:Task_model):Promise<FailedStatus_reply  & Task_model|void>
    readAllTask():Promise<  Task_model[]|void>
}
