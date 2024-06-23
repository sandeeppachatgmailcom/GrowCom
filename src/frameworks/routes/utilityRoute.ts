

import { Route, Req, Res, Next } from '../ServerTypes'
import express, { Router } from 'express'; 
import { adminApis } from '../../interfaces/apis/adminapi';
import { adminController, utilsController } from '../injection/injection';
import { UtilityController } from '../../interfaces/controller/utilityController';

export function utilRouter(router :Router) {
  
/**
 * @swagger
 * /utils/listBatches:
 *   get:
 *     summary: Get all batches
 *     description: Returns a list of all batches in the system.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Batch'
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Utils
 */
    
router.get('/listBatches',(req: Req, res: Res, next: Next) => {
  try {
   
    utilsController.getActiveBatches(req, res, next);
      
  } catch (error) {}
});   


  /**
 * @swagger
 * /utils/getActiveVenues:
 *   get:
 *     summary: Get List of venues
 *     description: Call this API to get all the active venues created. No input parameters are required. The response will include venue names and IDs.
 *     responses:
 *       '200':
 *         description: A list of venues created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the venue.
 *                   name:
 *                     type: string
 *                     description: The name of the venue.
 *       '404':
 *         description: No venues found.
 *       '500':
 *         description: Internal server error
 *     tags:
 *       - Utils
 */

    router.get('/getActiveVenues',(req: Req, res: Res, next: Next) => {
        try {
             
            adminController.getActiveVenues(req, res, next);
        } catch (error) {}
      });  
       /**
 * @swagger
 * /utils/getActiveTrainers:
 *   get:
 *     summary: Get List of  Trainers
 *     description: Call this API to get all the active Trainers created. No input parameters are required. The response will include Trainers names,email,contact,profile image link and IDs.
 *     responses:
 *       '200':
 *         description: A list of Trainers created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the venue.
 *                   name:
 *                     type: string
 *                     description: The name of the venue.
 *       '404':
 *         description: No venues found.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Utils
 */

    router.get('/getActiveTrainers',(req: Req, res: Res, next: Next) => {
        try {
           
            adminController.getActiveTrainers(req, res, next); 
        } catch (error) {}
      }); 
/**
 * @swagger
 * /utils/listActiveEvents:
 *   get:
 *     summary: Get List of Active Events
 *     description: Call this API to get all the active Trainers created. No input parameters are required. The response will include Trainers names,email,contact,profile image link and IDs.
 *     responses:
 *       '200':
 *         description: A list of Trainers created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the venue.
 *                   name:
 *                     type: string
 *                     description: The name of the venue.
 *       '404':
 *         description: No venues found.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Utils
 */
     
      
      router.get('/listActiveEvents',(req: Req, res: Res, next: Next) => {
        try {
           
            utilsController.getActiveEvents(req, res, next); 
        } catch (error) {}
      });     



      /**
 * @swagger
 * /utils/listAllTask:
 *   get:
 *     summary: Get List of Active Task
 *     description: Call this API to get all the active Trainers created. No input parameters are required. The response will include Trainers names,email,contact,profile image link and IDs.
 *     responses:
 *       '200':
 *         description: A list of Trainers created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the venue.
 *                   name:
 *                     type: string
 *                     description: The name of the venue.
 *       '404':
 *         description: No venues found.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Utils
 */
     
      
      router.get('/listAllTask',(req: Req, res: Res, next: Next) => {
        try {
             
            utilsController.getActiveTask(req, res, next); 
        } catch (error) {}
      });  

      /**
 * @swagger
 * /utils/getAllDesignation:
 *   get:
 *     summary: Get List of get All Designation
 *     description: Call this API to get all the active Designation created. No input parameters are required. The response will include Trainers names,email,contact,profile image link and IDs.
 *     responses:
 *       '200':
 *         description: A list of Trainers created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the venue.
 *                   name:
 *                     type: string
 *                     description: The name of the venue.
 *       '404':
 *         description: No venues found.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Utils
 */
    
      router.get('/getAllDesignation',(req: Req, res: Res, next: Next) => {
        try {
             
            utilsController.getActiveDesignation(req, res, next); 
        } catch (error) {}
      });  

           /**
 * @swagger
 * /utils/getActiveUsers:
 *   get:
 *     summary: Get List of  Trainers
 *     description: Call this API to get all the active Trainers created. No input parameters are required. The response will include Trainers names,email,contact,profile image link and IDs.
 *     responses:
 *       '200':
 *         description: A list of Trainers created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the venue.
 *                   name:
 *                     type: string
 *                     description: The name of the venue.
 *       '404':
 *         description: No venues found.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Utils
 */

    router.get('/getActiveUsers',(req: Req, res: Res, next: Next) => {
      try {
         
          adminController.getActiveUsers(req, res, next); 
      } catch (error) {}
    }); 



 /**
 * @swagger
 * /utils/studentsTaskProgressRatio:  # Corrected endpoint name (descriptive)
 *   post:
 *     summary: Get Student Task Progress Ratio
 *       # Description should reflect actual functionality
 *     description: This API retrieves a student's progress ratio on scheduled tasks based on their email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the student.
 *     responses:
 *       '200':
 *         description: Student details and associated scheduled tasks progress ratio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Assuming response is a single object
 *               properties:
 *                 # ... Define properties for user details and progress ratio
 *       '400':
 *         description: Bad request (e.g., invalid email format).
 *       '404':
 *         description: Student not found for the provided email.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Utils  # Corrected tag
 */

      router.post('/studentsTaskProgressRatio',(req: Req, res: Res, next: Next) => {
      try {
          
          utilsController.getStudentsTaskProgress(req, res, next); 
      } catch (error) {}
    }); 


    

 /**
 * @swagger
 * /utils/getuserDetailsByEmail:  # Corrected endpoint name (descriptive)
 *   post:
 *     summary: Get Student Task Progress Ratio
 *       # Description should reflect actual functionality
 *     description: This API retrieves a student's progress ratio on scheduled tasks based on their email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the student.
 *     responses:
 *       '200':
 *         description: Student details and associated scheduled tasks progress ratio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object  # Assuming response is a single object
 *               properties:
 *                 # ... Define properties for user details and progress ratio
 *       '400':
 *         description: Bad request (e.g., invalid email format).
 *       '404':
 *         description: Student not found for the provided email.
 *       '500':
 *         description: Internal server error.
 *     tags:
 *       - Utils  # Corrected tag
 */

 router.post('/getuserDetailsByEmail',(req: Req, res: Res, next: Next) => {
  try {
      
      utilsController.getuserDetailsByEmail(req, res, next); 
  } catch (error) {}
}); 


      return router 
}