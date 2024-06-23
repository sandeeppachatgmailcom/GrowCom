import { Next, Req, Res } from "../../frameworks/ServerTypes";
import { TrainerUsecase } from "../../entity/usecases/trainerUseCase";

export class TrainerController {
  constructor(private trainerSocket: TrainerUsecase) {}

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
      
      const creaethetak = await this.trainerSocket.createScheduledTask(data);
      res.status(200).json(creaethetak);
    } catch (error) {}
  }

  async updateMarkToCollection (req: Req, res: Res, next: Next){
    try {
       const data = req.body
        const updateMark = await this.trainerSocket.updateMarkToCollection(data);
        res.json(updateMark)
    } catch (error) {
      
    }
  }

  async staffWiseBatchProgress (req: Req, res: Res, next: Next){
  try {
      const result    = await this.trainerSocket.designationWiseProgress(req.body)
      res.json(result)
  } catch (error) {
    
  }
  }

  async getWeeklyStudentssummary (req: Req, res: Res, next: Next){
    try {
        const result = await this.trainerSocket.getWeeklyStudentssummary()
        res.json(result)
    } catch (error) {
      
    }
    }
  async designationWiseEventProgress (req: Req, res: Res, next: Next){
    try {
      
        const result = await this.trainerSocket.designationWiseEventProgress(req.body)
        res.json(result)
    } catch (error) {
      
    }
    }  
  
}
