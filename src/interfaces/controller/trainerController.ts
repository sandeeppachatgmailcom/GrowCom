import { Next, Req, Res } from "../../entity/Types/ServerTypes";
import { TrainerSocket } from "../../usecases/trainerSocket";

export class TrainerController {
  constructor(private trainerSocket: TrainerSocket) {}

  async postTrainerPendingEvents(req: Req, res: Res, next: Next) {
    try {
      const data = req.body;
       
      const pendings = await this.trainerSocket.getPending(data);
      
      res.status(200).json(pendings);
    } catch (error) {
      
    }
  }

  async postCreateScheduledTask(req: Req, res: Res, next: Next) {
    try {

      const data = req.body;
      console.log(data,'datadatadata') 
      const creaethetak = await this.trainerSocket.createScheduledTask(data);
      res.status(200).json(creaethetak);
    } catch (error) {}
  }
}
