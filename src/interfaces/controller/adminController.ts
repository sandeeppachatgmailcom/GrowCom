import { Route, Req, Res, Next } from "../../entity/Types/ServerTypes";
import venuModel from "../../frameworks/models/venueModel";
import { UtilitySocket } from "../../usecases/UtilitySocket";
import { AdminSocket } from "../../usecases/AdminSocket";

export class AdminController {
  constructor(
    private adminSocket: AdminSocket,
    private utilsSocket: UtilitySocket
  ) {}
  async getUsers(req: Req, res: Res, next: Next) {
    try {
      const users = await this.adminSocket.pending_Approval_Staff();
      res.json(users);
    } catch (error) {}
  }
  async getlistpendingStaff(req: Req, res: Res, next: Next) {
    try {
      const users = await this.adminSocket.pending_Approval_Staff();
      console.log(users, "userssssssss");
      res.json(users);
    } catch (error) {}
  }
  async postCreateBatch(req: Req, res: Res, next: Next) {
    try {
      console.log('reached controller ')
      const batch = await this.adminSocket.createBatch(req.body);
      console.log(batch,'batch');
      res.status(200).json(batch);
    } catch (error) {}
  }

  async postCreateVenue(req: Req, res: Res, next: Next) {
    try {
        console.log('reached controller')
      const venue = await this.adminSocket.createVenue(req.body);
      console.log(venue);
      res.status(200).json(venue);
    } catch (error) {}
  }

  async getActiveVenues(req: Req, res: Res, next: Next) {
    try {
      const venues = await this.utilsSocket.getActiveVenue();
      res.json(venues);
    } catch (error) {}
  }

  async getActiveTrainers (req: Req, res: Res, next: Next) {
    try {
        console.log('reached conrtroller')
      const trainers = await this.utilsSocket.getActiveTrainers();
      res.json(trainers);
    } catch (error) {}
  }

  async postCreateEvents(req:Req,res:Res,next:Next){
    try {
        console.log('reached admin Controller')
        const newEvent = await this.adminSocket.creatAndEditEvents(req.body)
        console.log(newEvent,'newEventnewEventnewEvent')
        res.json(newEvent)
    } catch (error) {
      
    }
  }
  async postDeleteEvents(req:Req,res:Res,next:Next){
    try {
        console.log('reached admin controller ')
        const deleteEvent = await this.adminSocket.deleteEvents(req.body);
        console.log(deleteEvent,'deleteEventdeleteEvent')
        res.json(deleteEvent)
    } catch (error) {
      
    }
  }
}
