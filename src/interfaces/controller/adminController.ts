import { Route, Req, Res, Next } from "../../entity/types/serverTypes";
import { adminSocket } from "../../entity/usecases/adminSocket";


export class  AdminController {
    constructor(
        private adminSocket:adminSocket 
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


} 