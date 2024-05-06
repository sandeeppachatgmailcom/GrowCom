import { Event_Model } from "../entity/models/eventModel";
import { EventsRepository } from "../entity/repository/eventsRepository";
import { TrainerUsecase } from "../entity/usecases/trainerUseCase";
import { GeneralUtils } from "../interfaces/utils/GeneralUtils";

export class TrainerSocket implements TrainerUsecase{
    constructor(
        private eventRepo :EventsRepository ,
        private genRepo:GeneralUtils
    ){
       
    }
    async getPending(data:{email:string,startDate:Date,endDate:Date}):Promise<Event_Model[]|void> {
         const events = await this.eventRepo.getTaskByTrainerEmail(data);
         let pendingWork:any = []
         if(events){
            
            
            events.map((event:Event_Model,index)=>{
                
                let curDate = new Date(data.startDate);
                let endDate= new Date(data.endDate)
                for (let i:any = curDate;i<=endDate; i.setDate(i.getDate()+1)){
                    const result = this.genRepo.getDayName(i)
                    
                    if (event.repeat=='Weekly'){
                         
                        if(result.dayName == event.dayName) {
                            const scheduleProgram = {scheduledDate:new Date(i) ,...JSON.parse(JSON.stringify(event))}
                            if (event.startDate &&  i >= event.startDate ) pendingWork.push(scheduleProgram)}
                    }
                    else if (event.repeat=='daily'){
                     
                        const scheduleProgram = {scheduledDate:new Date(i) ,...JSON.parse(JSON.stringify(event))}
                        if (event.startDate &&  i >= event.startDate ) pendingWork.push(scheduleProgram)    
                    }
                    else  if (event.repeat=='Monthly') {
                       
                        if(result.day == event.monthDay) {
                            console.log(result.day,'<-' ,event.monthDay)
                            const scheduleProgram = {scheduledDate:new Date(i) ,...JSON.parse(JSON.stringify(event))}
                            if (event.startDate &&  i >= event.startDate ) pendingWork.push(scheduleProgram)    
                        }
                    }
                    else  if (event.repeat=='anualy') {
                        const month = result.monthDay+'-'+result.day
                        if(month == event.yearDay) {
                            const scheduleProgram = {scheduledDate:new Date(i) ,...JSON.parse(JSON.stringify(event))}
                            if (event.startDate &&  i >= event.startDate ) pendingWork.push(scheduleProgram)    
                        }
                    }
                }
            })
                
            
                //console.log(pendingWork.sort((a:any,b:any)=>a.scheduledDate-b.scheduledDate),'pending')
            }

         return pendingWork.sort((a:any,b:any)=>a.scheduledDate-b.scheduledDate)
          
    }
}