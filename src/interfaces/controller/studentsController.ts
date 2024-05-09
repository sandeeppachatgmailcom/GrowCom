import { Next, Req, Res } from "../../entity/Types/ServerTypes";
import { StudentUseCase } from "../../entity/usecases/StudentUsecase";

export class StudentsController {
    constructor(
        private studentsSocket:StudentUseCase
    ){

    }
    async postStudentsTask(req:Req,res:Res,next:Next){
        const task = await this.studentsSocket.getStudentsTask(req.body)
        res.json(task)
    }

}