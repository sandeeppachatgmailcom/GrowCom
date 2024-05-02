import { adminController, userController } from '../injection/injection'
import { Route, Req, Res, Next } from '../../entity/Types/ServerTypes'
import express, { Router } from 'express'; 
import { adminApis } from '../../interfaces/apis/adminapi';

 
  




export function adminRouter(router: Router){
     /**
/**
 * @swagger
 * /admin/createVenue:
 *   post:
 *     summary: Create a new venue
 *     description: Creates a new venue with the provided name. If the venue already exists, a message will be generated along with the existing venue details and the status will be set to false.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueName:
 *                 type: string
 *                 description: The name of the venue to be created.
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
 *       - Admin
 */
router.post('/createVenue',(req: Req, res: Res, next: Next) => {
  try {
    console.log('helooooo reached router')
      adminController.postCreateVenue(req, res, next);
  } catch (error) {}
});   


    /**
 * @swagger
 * /admin/listpendingStaff:
 *   get:
 *     summary: Get List of Pending Staff
 *     description: Retrieve a list of pending staff members from the admin dashboard.
 *     responses:
 *       '200':
 *         description: A list of pending staff members retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the pending staff member.
 *                   name:
 *                     type: string
 *                     description: The name of the pending staff member.
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: The email address of the pending staff member.
 *                   role:
 *                     type: string
 *                     description: The role of the pending staff member.
 *       '404':
 *         description: No pending staff members found.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Admin
 */
    router.get('/listpendingStaff',(req: Req, res: Res, next: Next) => {
        try {
            adminController.getlistpendingStaff(req, res, next);
        } catch (error) {}
      });  
    /**
 * @swagger
 * admin/approveStaff:
 *   post:
 *     summary: Approve Staff
 *     description: Approve a staff member from the admin dashboard.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the staff member to approve.
 *               name:
 *                 type: string
 *                 description: The name of the staff member to approve.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the staff member to approve.
 *               role:
 *                 type: string
 *                 description: The role of the staff member to approve.
 *     responses:
 *       '200':
 *         description: Staff member approved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the staff member was approved successfully.
 *       '400':
 *         description: Bad request - Invalid input or missing required fields.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Admin
 */
    router.post(adminApis.approveStaff,  (req: Req, res: Res, next: Next) => {
        try {
            userController.savebasicProfile(req, res, next);
        } catch (error) {}
      });   
    /**
 * @swagger
 * admin/approveStaff:
 *   post:
 *     summary: Approve Staff
 *     description: Approve a staff member from the admin dashboard.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the staff member to approve.
 *               name:
 *                 type: string
 *                 description: The name of the staff member to approve.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the staff member to approve.
 *               role:
 *                 type: string
 *                 description: The role of the staff member to approve.
 *     responses:
 *       '200':
 *         description: Staff member approved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the staff member was approved successfully.
 *       '400':
 *         description: Bad request - Invalid input or missing required fields.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Admin
 */
    router.post(adminApis.approveStaff,  (req: Req, res: Res, next: Next) => {
        try {
            userController.savebasicProfile(req, res, next);
        } catch (error) {}
      });   


/**
 * @swagger
 * /admin/createBatch:
 *   post:
 *     summary: Create a new batch
 *     description: Endpoint to create a new batch.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               batchId:
 *                 type: string
 *               batchName:
 *                 type: string
 *               deleted:
 *                 type: boolean
 *               active:
 *                 type: boolean
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               coordinator:
 *                 type: string
 *               trainer:
 *                 type: string
 *               location:
 *                 type: string
 *               venue:
 *                 type: string
 *               maxCapacity:
 *                 type: number
 *               batchType:
 *                 type: string
 *               edited:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Batch created successfully.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Admin
 */

router.post(adminApis.createBatch, (req: Req, res: Res, next: Next) => {
  try {
    console.log('reached router ')
    adminController.postCreateBatch(req, res, next);
  } catch (error) {
    // Handle error
  }
});
 
/**
 * @swagger
 * /admin/createEvents:
 *   post:
 *     summary: Create Event
 *     description: Creates a new event.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event_Model'
 *     responses:
 *       200:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event_ModelWithStatus'
 *       400:
 *         description: Bad request (e.g., invalid event data)
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []  # Add your authentication scheme here (if applicable)
 *
 * components:
 *   schemas:
 *     Event_Model:
 *       type: object
 *       required:
 *         - eventName
 *         - eventId
 *         - eventType
 *       properties:
 *         eventName:
 *           type: string
 *           description: The name of the event.
 *         eventId:
 *           type: string
 *           description: The unique identifier of the event.
 *         cancelled:
 *           type: boolean
 *           description: Whether the event is cancelled.
 *         active:
 *           type: boolean
 *           description: Whether the event is active.
 *         deleted:
 *           type: boolean
 *           description: Whether the event is deleted.
 *         eventType:
 *           type: string
 *           enum:
 *             - public
 *             - inhouse
 *             - staff
 *             - student
 *           description: The type of the event.
 *     Event_ModelWithStatus:
 *       allOf:
 *         - $ref: '#/components/schemas/Event_Model'
 *         - type: object
 *           properties:
 *             status:
 *               type: boolean
 *               description: Indicates if the event creation was successful.
 *             message:
 *               type: string
 *               description: A message describing the outcome of the operation.
 *     tags:
 *       - Admin
 */
router.post('/createEvents',(req:Req,res:Res,next:Next)=>{
  try {
    adminController.postCreateEvents(req,res,next)
  } catch (error) {
    
  }
})

/**
 * @swagger
 * /admin/deleteEvent:
 *   post:
 *     summary: Delete Event
 *     description: Deletes an existing event.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event_Model'
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeletedEventResponse'
 *       400:
 *         description: Bad request (e.g., invalid event data, event not found)
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []  # Add your authentication scheme here (if applicable)
 *
 * components:
 *   schemas:
 *     Event_Model:
 *       $ref: '#/components/schemas/Event_Model'  # Reference existing schema
 *     DeletedEventResponse:
 *       type: object
 *       properties:
 *         eventId:
 *           type: string
 *           description: The unique identifier of the deleted event.
 *         message:
 *           type: string
 *           description: A message indicating the outcome of the deletion.
 *     tags:
 *       - Admin
 */
router.post('/deleteEvent',(req:Req,res:Res,next:Next)=>{
  try {
    adminController.postDeleteEvents(req,res,next)
  } catch (error) {
    
  }
})

    return router
}