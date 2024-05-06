import { FailedStatus_reply } from "../Types/failedStatus";
import { Task_model } from "../models/task";

export interface TaskRepository{
    crateTask(data:Task_model):Promise<FailedStatus_reply  & Task_model|void>
    readAllTask():Promise<  Task_model[]|void>
}
