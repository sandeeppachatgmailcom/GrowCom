import { Next, Req, Res } from "../../entity/Types/ServerTypes"
import { UtilitySocket } from "../../usecases/UtilitySocket"

export class UtilityController {
    constructor(
        private utility:UtilitySocket 
    ){
        
    }
    async getActiveBatches(req:Req,res:Res,next:Next){
        try {
            const batches =await this.utility.getActiveBatches()
            console.log(batches , 'batches listed ')
            if (batches) res.json(batches)
            else res.json([])
        } catch (error) {
            
        }

    }
    async getActiveEvents (req:Req,res:Res,next:Next){
        try {
            const events = await this.utility.getActiveEvents()
            console.log(events,'active events')
            if(events) res.json(events)
                else res.json([])
        } catch (error) {
            
        }
    }
    async getActiveTask (req:Req,res:Res,next:Next){
        try {
            console.log('reached controller ')
            const tasks =await  this.utility.getActiveTask()
            res.json(tasks) 
        } catch (error) {
            
        }
    }
}