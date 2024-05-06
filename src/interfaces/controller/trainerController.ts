import { Next, Req, Res } from "../../entity/Types/ServerTypes";
import { TrainerSocket } from "../../usecases/trainerSocket";

export  class TrainerController{
    constructor(
        private trainerSocket:TrainerSocket
    ){

    }
    
    async postTrainerPendingEvents (req:Req,res:Res,next:Next){
        const data = req.body 
        console.log('trainertrainertrainertrainer')
        const pendings = await this.trainerSocket.getPending(data)
        console.log(pendings,'pendings')
        res.status(200).json(pendings)
    }
    

}