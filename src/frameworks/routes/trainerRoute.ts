import express, { Router } from "express";
import { Next, Req, Res, Route } from "../../entity/Types/ServerTypes";
import { trainerController, utilsController } from "../injection/injection";

export function trainerRouter(router: Router) {
  /**
/**
 * @swagger
 * /trainer/postTrainerPendingEvents:
 *   post:
 *     summary: reads Trainer pendings
 *     description:  reads pendings of that purticular user in that day .
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email 
 *               startDate:
 *                 type: Date
 *                 description: email
 *               endtDate:
 *                 type: Date
 *                 description: email.
 *                  
 *     responses:
 *       '200':
 *         description: Venue created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the operation.
 *                 message:
 *                   type: string
 *                   description: Message indicating success or failure.
 *                 venueDetails:
 *                   type: object
 *                   properties:
 *                     venueName:
 *                       type: string
 *                       description: The name of the venue.
 *                     details:
 *                       type: string
 *                       description: Details about the venue.
 *       '400':
 *         description: Bad request, invalid input.
 *       '500':
 *         description: Internal server error.
*     tags:
 *       - Trainer
 */

  router.post(
    "/postTrainerPendingEvents",
    async (req: Req, res: Res, next: Next) => {
      try {
        console.log(req.body,'------------------++++++++++++++++-----------------')
        await trainerController.postTrainerPendingEvents(req, res, next);
      } catch (error) {}
    }
  );
  

   /**
 * @swagger
 * /trainer/postScheduleTask:
 *   post:
 *     summary: Schedule a task for a trainer
 *     description: Endpoint to schedule a task for a particular trainer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ScheduledTaskID:
 *                 type: string
 *                 description: The ID of the scheduled task.
 *               eventName:
 *                 type: string
 *                 description: Name of the event.
 *               scheduledDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the task is scheduled.
 *               staffInCharge:
 *                 type: string
 *                 description: The staff in charge of the task.
 *               location:
 *                 type: string
 *                 description: The location of the task.
 *               timeFixed:
 *                 type: boolean
 *                 description: Indicates if the time for the task is fixed.
 *               startDateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The start date and time for the task.
 *               endDateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The end date and time for the task.
 *               taskID:
 *                 type: string
 *                 description: The ID of the task.
 *               eventId:
 *                 type: string
 *                 description: The ID of the event related to the task.
 *               cancelled:
 *                 type: boolean
 *                 description: Indicates if the task is cancelled.
 *               active:
 *                 type: boolean
 *                 description: Indicates if the task is active.
 *               deleted:
 *                 type: boolean
 *                 description: Indicates if the task is deleted.
 *               audience:
 *                 type: object
 *                 description: Details about the audience of the task.
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The start date for the task.
 *               description:
 *                 type: string
 *                 description: Description of the task.
 *               dayName:
 *                 type: string
 *                 description: The name of the day for the task.
 *               monthDay:
 *                 type: string
 *                 description: The month day for the task.
 *               yearDay:
 *                 type: string
 *                 description: The year day for the task.
 *               Title:
 *                 type: string
 *                 description: The title of the task.
 *               details:
 *                 type: string
 *                 description: Details about the task.
 *               link:
 *                 type: string
 *                 description: The link associated with the task.
 *     responses:
 *       '200':
 *         description: Task scheduled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the operation.
 *                 message:
 *                   type: string
 *                   description: Message indicating success or failure.
 *                 scheduledTask:
 *                   type: object
 *                   description: Details of the scheduled task.
 *                   properties:
 *                     ScheduledTaskID:
 *                       type: string
 *                       description: The ID of the scheduled task.
 *                     eventName:
 *                       type: string
 *                       description: Name of the event.
 *                     scheduledDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the task is scheduled.
 *                     staffInCharge:
 *                       type: string
 *                       description: The staff in charge of the task.
 *                     location:
 *                       type: string
 *                       description: The location of the task.
 *                     timeFixed:
 *                       type: boolean
 *                       description: Indicates if the time for the task is fixed.
 *                     startDateTime:
 *                       type: string
 *                       format: date-time
 *                       description: The start date and time for the task.
 *                     endDateTime:
 *                       type: string
 *                       format: date-time
 *                       description: The end date and time for the task.
 *                     taskID:
 *                       type: string
 *                       description: The ID of the task.
 *                     eventId:
 *                       type: string
 *                       description: The ID of the event related to the task.
 *                     cancelled:
 *                       type: boolean
 *                       description: Indicates if the task is cancelled.
 *                     active:
 *                       type: boolean
 *                       description: Indicates if the task is active.
 *                     deleted:
 *                       type: boolean
 *                       description: Indicates if the task is deleted.
 *                     audience:
 *                       type: object
 *                       description: Details about the audience of the task.
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       description: The start date for the task.
 *                     description:
 *                       type: string
 *                       description: Description of the task.
 *                     dayName:
 *                       type: string
 *                       description: The name of the day for the task.
 *                     monthDay:
 *                       type: string
 *                       description: The month day for the task.
 *                     yearDay:
 *                       type: string
 *                       description: The year day for the task.
 *                     Title:
 *                       type: string
 *                       description: The title of the task.
 *                     details:
 *                       type: string
 *                       description: Details about the task.
 *                     link:
 *                       type: string
 *                       description: The link associated with the task.
 *       '400':
 *         description: Bad request, invalid input.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Trainer
 */


  router.post(
    "/postScheduleTask",
    async (req: Req, res: Res, next: Next) => {
      try {
         
        await trainerController.postCreateScheduledTask(req, res, next);
      } catch (error) {}
    }
  );

  
   /**
 * @swagger
 * /trainer/updateMarkToCollection:
 *   post:
 *     summary: Schedule a task for a trainer
 *     description: Endpoint to schedule a task for a particular trainer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ScheduledTaskID:
 *                 type: string
 *                 description: The ID of the scheduled task.
 *               eventName:
 *                 type: string
 *                 description: Name of the event.
 *               scheduledDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the task is scheduled.
 *               staffInCharge:
 *                 type: string
 *                 description: The staff in charge of the task.
 *               location:
 *                 type: string
 *                 description: The location of the task.
 *               timeFixed:
 *                 type: boolean
 *                 description: Indicates if the time for the task is fixed.
 *               startDateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The start date and time for the task.
 *               endDateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The end date and time for the task.
 *               taskID:
 *                 type: string
 *                 description: The ID of the task.
 *               eventId:
 *                 type: string
 *                 description: The ID of the event related to the task.
 *               cancelled:
 *                 type: boolean
 *                 description: Indicates if the task is cancelled.
 *               active:
 *                 type: boolean
 *                 description: Indicates if the task is active.
 *               deleted:
 *                 type: boolean
 *                 description: Indicates if the task is deleted.
 *               audience:
 *                 type: object
 *                 description: Details about the audience of the task.
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The start date for the task.
 *               description:
 *                 type: string
 *                 description: Description of the task.
 *               dayName:
 *                 type: string
 *                 description: The name of the day for the task.
 *               monthDay:
 *                 type: string
 *                 description: The month day for the task.
 *               yearDay:
 *                 type: string
 *                 description: The year day for the task.
 *               Title:
 *                 type: string
 *                 description: The title of the task.
 *               details:
 *                 type: string
 *                 description: Details about the task.
 *               link:
 *                 type: string
 *                 description: The link associated with the task.
 *     responses:
 *       '200':
 *         description: Task scheduled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the operation.
 *                 message:
 *                   type: string
 *                   description: Message indicating success or failure.
 *                 scheduledTask:
 *                   type: object
 *                   description: Details of the scheduled task.
 *                   properties:
 *                     ScheduledTaskID:
 *                       type: string
 *                       description: The ID of the scheduled task.
 *                     eventName:
 *                       type: string
 *                       description: Name of the event.
 *                     scheduledDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the task is scheduled.
 *                     staffInCharge:
 *                       type: string
 *                       description: The staff in charge of the task.
 *                     location:
 *                       type: string
 *                       description: The location of the task.
 *                     timeFixed:
 *                       type: boolean
 *                       description: Indicates if the time for the task is fixed.
 *                     startDateTime:
 *                       type: string
 *                       format: date-time
 *                       description: The start date and time for the task.
 *                     endDateTime:
 *                       type: string
 *                       format: date-time
 *                       description: The end date and time for the task.
 *                     taskID:
 *                       type: string
 *                       description: The ID of the task.
 *                     eventId:
 *                       type: string
 *                       description: The ID of the event related to the task.
 *                     cancelled:
 *                       type: boolean
 *                       description: Indicates if the task is cancelled.
 *                     active:
 *                       type: boolean
 *                       description: Indicates if the task is active.
 *                     deleted:
 *                       type: boolean
 *                       description: Indicates if the task is deleted.
 *                     audience:
 *                       type: object
 *                       description: Details about the audience of the task.
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       description: The start date for the task.
 *                     description:
 *                       type: string
 *                       description: Description of the task.
 *                     dayName:
 *                       type: string
 *                       description: The name of the day for the task.
 *                     monthDay:
 *                       type: string
 *                       description: The month day for the task.
 *                     yearDay:
 *                       type: string
 *                       description: The year day for the task.
 *                     Title:
 *                       type: string
 *                       description: The title of the task.
 *                     details:
 *                       type: string
 *                       description: Details about the task.
 *                     link:
 *                       type: string
 *                       description: The link associated with the task.
 *       '400':
 *         description: Bad request, invalid input.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Trainer
 */


   router.post(
    "/updateMarkToCollection",
    async (req: Req, res: Res, next: Next) => {
      try {
         
        await trainerController.updateMarkToCollection(req, res, next);
      } catch (error) {}
    }
  );



  /**
 * @swagger
 * /trainer/readBatchSummaryByDesignation:
 *   post:
 *     summary: Schedule a task for a trainer
 *     description: Endpoint to schedule a task for a particular trainer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                
 *               designation:
 *                 type: string
 *                 description: The link associated with the task.
 *     responses:
 *       '200':
 *         description: Task scheduled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the operation.
 *                 message:
 *                   type: string
 *                   description: Message indicating success or failure.
 *                 scheduledTask:
 *                   type: object
 *                   description: Details of the scheduled task.
 *                   properties:
 *                      
 *                     designation:
 *                       type: string
 *                       description: The link associated with the task.
 *       '400':
 *         description: Bad request, invalid input.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Trainer
 */


  router.post(
    "/getTrainerBasedBatchSummary",
    async (req: Req, res: Res, next: Next) => {
      try {
        await trainerController.staffWiseBatchProgress(req, res, next);
      } catch (error) {}
    }
  );

  
  /**
 * @swagger
 * /trainer/getWeeklyStudentssummary:
 *   get:
 *     summary: Schedule a task for a trainer
 *     description: Endpoint to schedule a task for a particular trainer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                
 *                
 *     responses:
 *       '200':
 *         description: Task scheduled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the operation.
 *                 message:
 *                   type: string
 *                   description: Message indicating success or failure.
 *                 scheduledTask:
 *                   type: object
 *                   description: Details of the scheduled task.
 *                   properties:
 *                      
 *                     designation:
 *                       type: string
 *                       description: The link associated with the task.
 *       '400':
 *         description: Bad request, invalid input.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Trainer
 */


  router.get(
    "/getWeeklyStudentssummary",
    async (req: Req, res: Res, next: Next) => {
      try {
         
        await trainerController.getWeeklyStudentssummary(req, res, next);
      } catch (error) {}
    }
  );

/**
 * @swagger
 * /trainer/designationWiseEventProgress:
 *   post:
 *     summary: Schedule a task for a trainer
 *     description: Endpoint to schedule a task for a particular trainer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                
 *               designation:
 *                 type: string
 *                 description: The link associated with the task.
 *     responses:
 *       '200':
 *         description: Task scheduled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the operation.
 *                 message:
 *                   type: string
 *                   description: Message indicating success or failure.
 *                 scheduledTask:
 *                   type: object
 *                   description: Details of the scheduled task.
 *                   properties:
 *                      
 *                     designation:
 *                       type: string
 *                       description: The link associated with the task.
 *       '400':
 *         description: Bad request, invalid input.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Trainer
 */


router.post(
  "/designationWiseEventProgress",
  async (req: Req, res: Res, next: Next) => {
    try {
      await trainerController.designationWiseEventProgress(req, res, next);
    } catch (error) {}
  }
);


  return router;
}
