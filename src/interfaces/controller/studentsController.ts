import { Next, Req, Res } from "../../frameworks/ServerTypes";
import { StudentUseCase } from "../../entity/usecases/StudentUsecase";

export class StudentsController {
    constructor(
        private studentsSocket:StudentUseCase,
        
    ){

    }
    async postStudentsTask(req:Req,res:Res,next:Next){
        try {
            
            const task = await this.studentsSocket.getStudentsTask(req.body)
            res.json(task)
        } catch (error) {
            
        }
    }
    async postSubmitStudentTask(req:Req,res:Res,next:Next){
        try {
            const submission = await this.studentsSocket.submitStudentsTask(req.body)
            console.log(submission,'submission task')
        res.json(submission)
        } catch (error) {
            
        }
    }


}