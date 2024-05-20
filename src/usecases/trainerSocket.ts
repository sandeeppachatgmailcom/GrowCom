import { FailedStatus_reply } from "../entity/Types/failedStatus";
import { Event_Model } from "../entity/models/eventModel";
import { ScheduledTask_Model } from "../entity/models/scheduledTask_Model";
import { StudentBatchRepository } from "../entity/repository/StudentBatchRepository";
import { EventsRepository } from "../entity/repository/eventsRepository";
import { ScheduledTask_Repository } from "../entity/repository/scheduledTaskRepository";
import { SerialNumbersRepository } from "../entity/repository/serialNumberRepository";
import { UserRepository } from "../entity/repository/userRepository";
import { TrainerUsecase } from "../entity/usecases/trainerUseCase";
import { GeneralUtils } from "../interfaces/utils/GeneralUtils";

export class TrainerSocket implements TrainerUsecase {
  constructor(
    private eventRepo: EventsRepository,
    private genRepo: GeneralUtils,
    private serialRepo: SerialNumbersRepository,
    private batchRepo: StudentBatchRepository,
    private SchTask: ScheduledTask_Repository,
    private userRepo: UserRepository
  ) {}

  async getAudianceGroup(audianceType: string) {
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
  }




  async getPending(data: {
    email: string;
    startDate: Date;
    endDate: Date;
}): Promise<ScheduledTask_Model[] | void> {
    const events = await this.eventRepo.getTaskByTrainerEmail(data);
    const scheduledEvent = await this.SchTask.getScheduledTask(data);
   // const subMission = await this.userRepo.getStudentSubmission()
    let pendingWork: any[] = [];

    if (events) {
        await Promise.all(events.map(async (item: Event_Model) => {
            let event = JSON.parse(JSON.stringify(item));
            const tempAudience = await this.getAudianceGroup(event.audienceType);
            event.audience = tempAudience;

            let curDate = new Date(data.startDate);
            let endDate = new Date(data.endDate);

            for (let i: any = curDate; i <= endDate; i.setDate(i.getDate() + 1)) {
                const result = this.genRepo.getDayName(i);
                if (event.repeat == "Weekly") {
                    if (result.dayName == event.dayName) {
                        const scheduleProgram = { scheduledDate: new Date(i), ...JSON.parse(JSON.stringify(event)) };
                      if( new Date(i)>= new Date())  pendingWork.push(scheduleProgram);
                    }
                } else if (event.repeat == "daily") {
                    const scheduleProgram = { scheduledDate: new Date(i), ...JSON.parse(JSON.stringify(event)) };
                    if( new Date(i)>= new Date()) pendingWork.push(scheduleProgram);
                } else if (event.repeat == "Monthly") {
                    if (result.day == event.monthDay) {
                        const scheduleProgram = { scheduledDate: new Date(i), ...JSON.parse(JSON.stringify(event)) };
                        if( new Date(i)>= new Date())  pendingWork.push(scheduleProgram);
                    }
                } else {
                    const month = result.monthDay + "-" + result.day;
                    if (month == event.yearDay) {
                        const scheduleProgram = { scheduledDate: new Date(i), ...JSON.parse(JSON.stringify(event)) };
                        if( new Date(i)>= new Date()) pendingWork.push(scheduleProgram);
                    }
                }
            }
        }));
        pendingWork.sort((a: any, b: any) => a.scheduledDate - b.scheduledDate);
        if (scheduledEvent) {
            const scheduledDates = new Set();
            scheduledEvent.forEach((event: any) => {
                event.scheduledDate.setHours(0, 0, 0, 0);
                scheduledDates.add(`${event.scheduledDate.getTime()}_${event.eventId}`);
            });
            pendingWork.forEach((work: any) => {
                work.scheduledDate.setHours(0, 0, 0, 0);
                if (scheduledDates.has(`${work.scheduledDate.getTime()}_${work.eventId}`)) {
                    // Find the corresponding scheduled event and update pendingWork
                    const correspondingEvent = scheduledEvent.find((event: any) => {
                        return (
                            event.scheduledDate.getTime() === work.scheduledDate.getTime() &&
                            event.eventId === work.eventId
                        );
                    });
                    if (correspondingEvent) {
                      console.log('am at here ')
                        // Update pendingWork with the corresponding event
                        Object.assign(work,JSON.parse(JSON.stringify( correspondingEvent)));
                        // console.log(work, 'Updated pendingWork item');
                    }
                }
            });
        }

        console.log(pendingWork, 'Final pendingWork');

        return pendingWork;
    }
}


  async createScheduledTask(
    data: ScheduledTask_Model
  ): Promise<void | (ScheduledTask_Model & FailedStatus_reply)> {
    if (!data.ScheduledTaskID) {
      const tempid = await this.serialRepo.getIndex({
        collectionName: "scheduledTask",
      });
      data.ScheduledTaskID = tempid.serialNumber;
    }
    console.log(data,'ssssssss')
    const task = await this.SchTask.createScheduledTask(data);
    console.log('task',task)
    return task as ScheduledTask_Model & FailedStatus_reply;
  }
}
