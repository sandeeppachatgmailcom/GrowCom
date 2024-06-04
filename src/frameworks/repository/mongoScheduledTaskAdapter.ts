import { deflate } from "zlib";
import { FailedStatus_reply } from "../../entity/Types/failedStatus";
import { ScheduledTask_Model } from "../../entity/models/scheduledTask_Model";
import { ScheduledTask_Repository } from "../../entity/repository/scheduledTaskRepository";
import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import scheduledTask_DB from "../models/scheduledTask_DB";
import { lookup } from "dns";
import userModel from "../models/userModel";
import { UserEntity_Model } from "../../entity/models/UserModel";
import { emitWarning } from "process";

export class MongoScheduledTask implements ScheduledTask_Repository {
  async createScheduledTask(
    data: ScheduledTask_Model & FailedStatus_reply
  ): Promise<void | (ScheduledTask_Model & FailedStatus_reply)> {
    try {
      const designation: UserEntity_Model = await userModel.findOne({
        email: data.staffInCharge,
      });
      if (data._id) delete data._id;
      if (data.message) delete data.message;
      if (data.status) delete data.status;
      data.staffDesignation = designation?.designation;

      const result = await scheduledTask_DB.updateOne(
        { ScheduledTaskID: data.ScheduledTaskID },
        { $set: data },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        return {
          status: true,
          message: "created successfullyxxx",
          ...data,
        };
      } else if (result.modifiedCount > 0) {
        return {
          status: true,
          message: "updated successfully",
          ...data,
        };
      } else {
        return {
          status: false,
          message: "no changes found",
          ...data,
        };
      }
    } catch (error) {
      console.error("Error creating/updating task:", error);
      return;
    }
  }

  async getScheduledTask(data: {
    email: string;
    startDate: Date;
    endDate: Date;
  }): Promise<void | ScheduledTask_Model[]> {
    const designation = await userModel.findOne({ email: data.email });

    const scheduledTask: ScheduledTask_Model[] = await scheduledTask_DB.find({
      staffDesignation: designation?.designation,
      //scheduledDate: { $gte: data.startDate, $lte: new Date( data.endDate) }
    });

    if (scheduledTask) return scheduledTask;
    else return [];
  }
  async getStudentTask(data: {
    batchId: string;
    week: string;
    startDate: Date;
    endDate: Date;
  }): Promise<void | ScheduledTask_Model[]> {
    const scheduledTasks = await scheduledTask_DB.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { "audience.role.student": true },
                { [`audience.btches.${data.batchId}`]: true },
                { [`audience.week.${data.week}`]: true },
              ],
            },
            {
              scheduledDate: {
                $gte: new Date(data.startDate),
                $lte: new Date(data.endDate),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "taskID",
          foreignField: "taskId",
          as: "tasks",
        },
      },
      {
        $lookup: {
          from: "submissions",
          localField: "ScheduledTaskID",
          foreignField: "scheduledTaskId",
          as: "submission",
        },
      },
    ]);

    return scheduledTasks;
  }

  async prepareAudianceList(data: { ScheduledTaskID: string }): Promise<void> {
    let studentsList = new Set();
    const task = await scheduledTask_DB.findOne({
      ScheduledTaskID: data.ScheduledTaskID,
    });
    let batches = [];
    let weeks = [];
    let roles = [];
    if (task?.audience) {
      Object.keys(task?.audience).map((audienceType) => {
        const audiance = task.audience;
        if (audienceType == "btches") {
          Object.keys(audiance?.btches).map((batch) => {
            if (audiance?.btches[batch]) {
              batches.push(batch);
            }
          });
        } else if (audienceType == "week") {
          Object.keys(audiance?.week).map((week) => {
            if (audiance?.week[week]) {
              weeks.push(week);
            }
          });
        } else if (audienceType == "role") {
          Object.keys(audiance?.role).map((role) => {
            if (audiance?.role[role]) {
              roles.push(role);
            }
          });
        }
      });
    }
    console.log(batches, weeks, roles, "batches,weeks,roles");
    const ogStudentsList: UserEntity_Model[] = await userModel.find(
      {
        $or: [
          {
            week: {
              $in: weeks,
            },
          },
          {
            batchId: {
              $in: batches,
            },
          },
          {
            role: {
              $in: roles,
            },
          },
        ],
      },
      {
        student: 1,
        firstName: 1,
        email: 1,
        batchId: 1,
        week: 1,
        role: 1,
      }
    );

    console.log(studentsList, "students list");

    ogStudentsList.map((student) => studentsList.add(student));
    const updateDb = await scheduledTask_DB.updateOne(
      { ScheduledTaskID: data.ScheduledTaskID },
      { $set: { participants: [...studentsList] } }
    );
    console.log(studentsList, "students list");
  }

  async designationWiseEventProgress(data: { designation: string; }): Promise<any[]> {  // Update the return type to match the expected return value
    console.log(data);
  
    // Fetch the scheduled tasks based on the designation
    const tempResult = await scheduledTask_DB.find(
      { staffDesignation: data.designation, deleted: false },
      {
        ScheduledTaskID: 1,
        scheduledDate: 1,
        staffDesignation: 1,
        submissionDate: 1,
        endDateTime: 1,
        startDateTime: 1,
        eventName: 1,
        participants:1,
        _id: 0,
      }
    );
  
    // Convert the result to a plain JavaScript object
    const result = JSON.parse(JSON.stringify(tempResult));
  
    // Iterate over the tasks and fetch the attendees for each task
    const final = await Promise.all(
      result.map(async (task: any) => {
        const key = `submission.${task.ScheduledTaskID}`;
        const list = await userModel.find(
          { [key]: { $exists: true } },
          { email: 1, _id: 0 }
        );
        task.attendees = list;  // Add the list of attendees to the task
        return task;
      })
    );
  
    console.log(final);
    return final;  // Return the final result with attendees included
  }

  async getStudentsTaskProgressRatio(data:{email:string}):Promise<void | UserEntity_Model[]>{
    try {
      console.log('first')
      const result = await userModel.aggregate([
        {
          $match: {
            email: data.email,
          },
        },
        {
          $lookup: {
            from: 'scheduledtasks',
            let: { userEmail: '$email' }, // Define variables for the lookup
            pipeline: [
              {
                $match: {
                  $expr: {
                    $gt: [
                      {
                        $size: {
                          $filter: {
                            input: '$participants',
                            as: 'participant',
                            cond: { $eq: ['$$participant.email', '$$userEmail'] },
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            ],
            as: 'totalPrograms', // Rename the output array to 'totalPrograms'
          },
        },
        {
          $project: {
            firstName: 1,
            email: 1,
            submission:1,
            'totalPrograms.ScheduledTaskID': 1,
            'totalPrograms.eventName': 1,
            'totalPrograms.matchedPrograms': 1,
          },
        },
      ]);
      const temp = JSON.parse(JSON.stringify(result))
      let out = []
       temp.map((student)=>{
        if(student.submission){
          console.log('test')
            Object.keys(student.submission).map((scTask)=>{
              
                Object.keys(student.submission[scTask]).map((task)=>{
                  console.log('test',scTask,task)
                  if(task!='program') student.submission[scTask][task][0] = student.submission[scTask][task][0].mark 
              })
              
          })
          
        }
        out.push(student)
        console.log(out,'student')
      })


      
        return out 

    } catch (error) {
      
    }
  } 
  
}
