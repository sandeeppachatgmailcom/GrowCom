import { Next, Req, Res } from "../../entity/Types/ServerTypes";
import { StudentUseCase } from "../../entity/usecases/StudentUsecase";

export class StudentsController {
    constructor(
        private studentsSocket:StudentUseCase,
        
    ){

    }
    async postStudentsTask(req:Req,res:Res,next:Next){
        const task = await this.studentsSocket.getStudentsTask(req.body)
        res.json(task)
    }
    async postSubmitStudentTask(req:Req,res:Res,next:Next){
        const submission = await this.studentsSocket.submitStudentsTask(req.body)
        console.log(submission,'submission task')
        res.json(submission)
    }


}