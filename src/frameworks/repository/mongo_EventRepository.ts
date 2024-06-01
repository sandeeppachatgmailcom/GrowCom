import { Event_Model } from "../../entity/models/eventModel";
import { Event_Types } from "../../entity/ReturnTypes/events";
import { EventsRepository } from "../../entity/repository/eventsRepository";
import events_Model from "../models/eventModel";
import { FailedStatus_reply } from "../../entity/Types/failedStatus";

import { SerialNumbersRepository } from "../../entity/repository/serialNumberRepository";
import userModel from "../models/userModel";
import { UserEntity_Model } from "../../entity/models/UserModel";

export class Mongo_EventRepository implements EventsRepository {
  constructor(private indexRepo: SerialNumbersRepository) {}
  async creatAndEditEvents( 
    data: Event_Model
  ): Promise<void | (Event_Model & FailedStatus_reply)> {
    try {
      if (!data.eventId) {
        const exist = await events_Model.findOne({
          eventName: data.eventName,
          deleted: false,
        });
        if (exist) {
           
          return {
            status: false,
            message: "already another event in this name ",
            ...JSON.parse(JSON.stringify(exist)),
          };
        } else {
          const eventIndex = await this.indexRepo.getIndex({
            collectionName: "eventMaster",
          });

          data.eventId = eventIndex.serialNumber;

          const insert = await events_Model.updateOne(
            { eventId: data.eventId },
            { $set: data },
            { upsert: true }
          );

          const event = await events_Model.findOne({ eventId: data.eventId });
           
           
          return {
            status: true,
            message: "event creation success ",
            ...JSON.parse(JSON.stringify(event)),
          };
        }
      } else {
        const updateResult: any = await events_Model.updateOne(
          { deleted: false, eventId: data.eventId },
          { $set: data }
        );
         
        const result = await events_Model.findOne({ eventId: data.eventId });
        if (updateResult.modifiedCount > 0) {
          return {
            status: true,
            message: "event updation success",
            ...JSON.parse(JSON.stringify(result)),
          };
        } else {
          return {
            status: false,
            message: "no Active events in this name ",
            ...JSON.parse(JSON.stringify(result)),
          };
        }
      }
      return;
    } catch (error) {}
  }
  async deleteEvents(
    data: Event_Model
  ): Promise<void | (Event_Types & FailedStatus_reply)> {
    try {
      const result = await events_Model.updateOne(
        { eventId: data.eventId },
        { $set: { deleted: true } }
      );
      const reply = await events_Model.findOne({ eventId: data.eventId });
       
      return {
        status: true,
        message: "event deletion success",
        ...JSON.parse(JSON.stringify(reply)),
      };
    } catch (error) {}
  }
  async readActiveEvents(): Promise<void | Event_Model[]> {
    try {
      const reply = await events_Model.find({ deleted: false });
       
      if (reply) return reply;
      else return;
    } catch (error) {}
  }
  async getTaskByTrainerEmail(data: {
    email: string;
  }): Promise<void | Event_Model[]> {
    try {
        const designation = await userModel.find({ email: data.email });
    const localactiveEvents = await events_Model.find({
      designation: designation?.designation,
      deleted: false,
      active: true,
    });
     

    const activeEvents = await events_Model.aggregate([
      {
        $match: {
          designation: designation[0].designation,
          deleted: false,
          active: true,
        },
      },
      {
        $lookup: {
          from: "tasks",
          let: { eventId: "$eventId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$$eventId", "$associatedPrograms"],
                },
              },
            },
          ],
          as: "matchedTasks",
        },
      },
    ]);

    return activeEvents;
    } catch (error) {
        
    }
  }
  async getTaskByDesignation(data: {
    designation: string;
  }): Promise<void | Event_Model[]> {
    try {
      const localactiveEvents = await events_Model.find({
        staffInCharge: data.email,
        deleted: false,
        active: true,
      });
      const activeEvents = await events_Model.aggregate([
        {
          $match: {
            designation: data.designation,
            deleted: false,
            active: true,
          },
        },
        {
          $lookup: {
            from: "tasks",
            let: { eventId: "$eventId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$$eventId", "$associatedPrograms"],
                  },
                },
              },
            ],
            as: "matchedTasks",
          },
        },
      ]);
       
      return activeEvents;
    } catch (error) {}
  }
}
