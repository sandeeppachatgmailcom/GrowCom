import { Route, Req, Res, Next } from "../../entity/Types/ServerTypes";
import { AdminSocket } from "../../usecases/adminUseCases";  


export class  AdminController {
    constructor(
        private adminSocket:AdminSocket 
     ){

    }
    async getUsers(req:Req,res:Res,next:Next) {
        try {
            const users =await this.adminSocket.pending_Approval_Staff();
            res.json(users)

        } catch (error) {
            
        }
    }
    async getlistpendingStaff(req:Req,res:Res,next:Next){
        try {
            const users =await this.adminSocket.pending_Approval_Staff();
            console.log(users,'userssssssss')
            res.json(users)
        } catch (error) {
            
        }
    }
    async postCreateBatch(req:Req,res:Res,next:Next){
        try {
            const batch = await this.adminSocket.createBatch(req.body);
            console.log(batch)
            res.status(200).json(batch)
        } catch (error) {
            
        }
    }


} 