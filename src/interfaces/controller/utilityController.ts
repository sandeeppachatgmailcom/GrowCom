import { Next, Req, Res } from "../../entity/Types_1/ServerTypes"
import { UtilitySocket } from "../../usecases/utilitySocket"

export class UtilityController {
    constructor(
        private utility:UtilitySocket 
    ){
        
    }
    async getActiveBatches(req:Req,res:Res,next:Next){
        try {
            const batches =await this.utility.getActiveBatches()
            
            if (batches) res.json(batches)
            else res.json([])
        } catch (error) {
            
        }

    }
    async getActiveEvents (req:Req,res:Res,next:Next){
        try {
            const events = await this.utility.getActiveEvents()
            
            if(events) res.json(events)
                else res.json([])
        } catch (error) {
            
        }
    }
    async getActiveTask (req:Req,res:Res,next:Next){
        try {
           
            const tasks =await this.utility.getActiveTask()
            res.json(tasks) 
        } catch (error) {
            
        }
    }
    async getActiveDesignation (req:Req,res:Res,next:Next){
        try {
            
            const designation = await this.utility.getActiveDesignation()
            res.json(designation)
        } catch (error) {
            
        }
    }
    
    async getStudentsTaskProgress (req:Req,res:Res,next:Next){
        try {
            
            const student = await this.utility.getStudentsTaskProgressRatio(req.body)
            res.json(student)
        } catch (error) {
            
        }
    }
    async getuserDetailsByEmail (req:Req,res:Res,next:Next){
        try {
            
            const student = await this.utility.getuserDetailsByEmail(req.body)
            res.json(student)
        } catch (error) {
            
        }
    } 
   
}