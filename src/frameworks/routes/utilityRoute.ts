

import { Route, Req, Res, Next } from '../../entity/Types/ServerTypes'
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
    console.log('first')
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
            console.log('reched backend')
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
            console.log('reched backend')
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
            console.log('reched backend')
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
            console.log('reched backend')
            utilsController.getActiveTask(req, res, next); 
        } catch (error) {}
      });  

      return router 
}