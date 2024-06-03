import { resourceLimits } from "worker_threads";
import { FailedStatus_reply } from "../entity/Types/failedStatus";
import { UserEntity_Model } from "../entity/models/UserModel";
import { Event_Model } from "../entity/models/eventModel";
import { ScheduledTask_Model } from "../entity/models/scheduledTask_Model";
import { StudentBatchRepository } from "../entity/repository/StudentBatchRepository";
import { EventsRepository } from "../entity/repository/eventsRepository";
import { ScheduledTask_Repository } from "../entity/repository/scheduledTaskRepository";
import { SerialNumbersRepository } from "../entity/repository/serialNumberRepository";
import { UserRepository } from "../entity/repository/userRepository";
import { TrainerUsecase } from "../entity/usecases/trainerUseCase";
import { GeneralUtils } from "../interfaces/utils/GeneralUtils";
import { ScheduledTaskManagerService } from "../entity/services/scheduledTaskManager";

export class TrainerSocket implements TrainerUsecase {
  constructor(
    private eventRepo: EventsRepository,
    private genRepo: GeneralUtils,
    private serialRepo: SerialNumbersRepository,
    private batchRepo: StudentBatchRepository,
    private SchTask: ScheduledTask_Repository,
    private userRepo: UserRepository,
    private SchedulerService :ScheduledTaskManagerService 
  ) {}

  async getAudianceGroup(audianceType: string) {
    try {
      let audiancedata = { btches: {}, week: {}, role: {} };

    if (audianceType == "batch") {
      const tempdata = await this.batchRepo.readActiveBatches();

      tempdata?.forEach((item: any) => {
        audiancedata.btches[item.batchName] = true;
      });
    } else if (audianceType == "week") {
      for (let i = 1; i <= 28; i++) {
        audiancedata.week["week" + i] = true;
      }
    } else if (audianceType == "staff") {
      audiancedata.role = {
        student: false,
        trainer: true,
        admin: true,
        user: false,
      };
    } else if (audianceType == "student") {
      audiancedata.role = {
        student: true,
        trainer: false,
        admin: false,
        user: false,
      };
    } else if (audianceType == "inhouse") {
      audiancedata.role = {
        student: true,
        trainer: true,
        admin: true,
        user: false,
      };
    } else if (audianceType == "open") {
      audiancedata.role = {
        student: true,
        trainer: true,
        admin: true,
        user: true,
      };
    }
    return audiancedata;
    } catch (error) {
      
    }
  }

  async getPending(data: {
    email: string;
    startDate: Date;
    endDate: Date;
  }): Promise<ScheduledTask_Model[] | void> {
    try {
    
    const events = await this.eventRepo.getTaskByTrainerEmail(data);
    const scheduledEvent = await this.SchTask.getScheduledTask(data);
    const tempMission = await this.userRepo.getStudentSubmission();
    const subMission = JSON.parse(JSON.stringify(tempMission));
    

    const studentSubmission = subMission.map((student: any) => {
      let tempOut = [];
      for (let key in student.submission) {
        const tempsche = scheduledEvent.filter((evento: any) => {
          if (evento.ScheduledTaskID == key) return evento;
        });

        for (let taskkey in student.submission[key]) {
          const tempSudmission = {
            type: "submission",
            ...student,
            ...tempsche[0]?._doc,
            ...student?.submission[key][taskkey][0],
          };

          // delete tempSudmission.submission;
          delete tempSudmission.audience;
          delete tempSudmission.matchedTasks;

          tempOut.push(tempSudmission);
        }
      }
      return tempOut;
    });

    let pendingWork: any[] = [];

    studentSubmission.map((item: any) => {
      pendingWork = [...pendingWork, ...item];
    });
    if (events) {
      const p = await Promise.all(
        events.map(async (item: Event_Model) => {
          let event = JSON.parse(JSON.stringify(item));
          const tempAudience = await this.getAudianceGroup(event.audienceType);
          event.audience = tempAudience;

          let curDate = new Date(data.startDate);
          let endDate = new Date(data.endDate);

          for (let i: any = curDate; i <= endDate; i.setDate(i.getDate() + 1)) {
            const result = this.genRepo.getDayName(i);
            if (event.repeat == "Weekly") {
              if (result.dayName == event.dayName) {
                const scheduleProgram = {
                  type: "taskCreation",
                  scheduledDate: new Date(i),
                  ...JSON.parse(JSON.stringify(event)),
                };
                if (new Date(i) >= new Date())
                  pendingWork.push(scheduleProgram);
              }
            } else if (event.repeat == "daily") {
              const scheduleProgram = {
                type: "taskCreation",
                scheduledDate: new Date(i),
                ...JSON.parse(JSON.stringify(event)),
              };
              if (new Date(i) >= new Date()) pendingWork.push(scheduleProgram);
            } else if (event.repeat == "Monthly") {
              if (result.day == event.monthDay) {
                const scheduleProgram = {
                  type: "taskCreation",
                  scheduledDate: new Date(i),
                  ...JSON.parse(JSON.stringify(event)),
                };
                if (new Date(i) >= new Date())
                  pendingWork.push(scheduleProgram);
              }
            } else {
              const month = result.monthDay + "-" + result.day;
              if (month == event.yearDay) {
                const scheduleProgram = {
                  type: "taskCreation",
                  scheduledDate: new Date(i),
                  ...JSON.parse(JSON.stringify(event)),
                };
                if (new Date(i) >= new Date())
                  pendingWork.push(scheduleProgram);
              }
            }
          }
        })
      );

      pendingWork.sort((a: any, b: any) => a.scheduledDate - b.scheduledDate);
     
      if (scheduledEvent) {
        const scheduledDates = new Set();
        scheduledEvent.forEach((event: any) => {
          event.scheduledDate.setHours(0, 0, 0, 0);

          scheduledDates.add(
            `${event.scheduledDate.toISOString().split("T")[0]}_${
              event.eventId
            }`
          );
        });
        
        pendingWork.forEach((work: any) => {
          work.scheduledDate.setHours(0, 0, 0, 0);
           
           
          if (
            scheduledDates.has(
              `${work.scheduledDate.toISOString().split("T")[0]}_${
                work.eventId
              }`
            )
          ) {
            // Find the corresponding scheduled event and update pendingWork
            const correspondingEvent = scheduledEvent.find((event: any) => {
               
              return (
                 event.scheduledDate.toISOString().split('T')[0] === work.scheduledDate.toISOString().split('T')[0] &&
                event.eventId === work.eventId
              );
            });

            if (correspondingEvent) {
              // Update pendingWork with the corresponding event
              Object.assign(
                work,
                JSON.parse(JSON.stringify(correspondingEvent))
              );
              
            }
          }
        });
        
      }
      return pendingWork;
    }
    
  } catch (error) {
    
  }
    
  }

  async createScheduledTask(
    data: ScheduledTask_Model
  ): Promise<void | (ScheduledTask_Model & FailedStatus_reply)> {
   try {
    if (!data.ScheduledTaskID) {
      const tempid = await this.serialRepo.getIndex({
        collectionName: "scheduledTask",
      });
      data.ScheduledTaskID = tempid.serialNumber;
    }

    const task = await this.SchTask.createScheduledTask(data);
    console.log(task,'new Work Starts Here ')
    const start =await  this.SchedulerService.startTask(task)
    const end =await  this.SchedulerService.endTask(task)
    console.log(start,end,'start end ')



    return task as ScheduledTask_Model & FailedStatus_reply;
   } catch (error) {
    
   }
  }

  async updateMarkToCollection(data: {
    email: string;
    ScheduledTaskID: string;
    taskId: string;
    mark: string;
    comment: string;
    verified: boolean;
  }): Promise<UserEntity_Model & FailedStatus_reply | void> {
    try {
      const tempuser: UserEntity_Model = await this.userRepo.findUser({
        email: data.email,
      });
      // if (!tempuser) {
      //   return { status: false, message: 'User not found' }; // Error handling for non-existent user
      // }
       
      const user = JSON.parse(JSON.stringify(tempuser));
      user.submission[data.ScheduledTaskID][data.taskId][0].mark = data.mark;
      user.submission[data.ScheduledTaskID][data.taskId][0].verified =
        data.verified;
      user.submission[data.ScheduledTaskID][data.taskId][0].comment =
        data.comment;
      
      const result = await this.userRepo.updateUserBasics(user);
      
      return {...result ,status:true,message:'Update success'};
    
    } catch (error) {
      
    }}

async designationWiseProgress(data: { designation: string; }): Promise<void | []> {
  try {
      const batches = await this.batchRepo.readBatchSummaryBystaffId({designation:data.designation}) 
      console.log(batches)
      return batches
       } catch (error) {
      console.log(error)
  }
}
async getWeeklyStudentssummary(): Promise<void | { week: string; count: number; }[]> {
  try {
      const result = await this.userRepo.getWeeklyStudentssummary()
      console.log(result,'result')
      return result
  } catch (error) {
    console.log(error)
  }
}
async designationWiseEventProgress(data: { designation: string; }): Promise<[]> {
    try {
      const result = await this.SchTask.designationWiseEventProgress(data)
      return result
    } catch (error) {
      
    }
}



}
