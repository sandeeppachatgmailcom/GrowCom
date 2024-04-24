import { adminController, userController } from '../injection/injection'
import { Route, Req, Res, Next } from '../../entity/types/serverTypes'
import express, { Router } from 'express'; 
import { adminApis } from '../../interfaces/apis/adminapi';

 
  




export function adminRouter(router: Router){
   /**
 * @swagger
 *  /admin/listBatches:
 *   get:
 *     summary: Get List of Batches
 *     description: Retrieve a list of batches from the admin dashboard.
 *     responses:
 *       '200':
 *         description: A list of batches retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the batch.
 *                   name:
 *                     type: string
 *                     description: The name of the batch.
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     description: The start date of the batch.
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     description: The end date of the batch.
 *       '404':
 *         description: No batches found.
 *       '500':
 *         description: Internal server error.
 */
    
    router.get('/listBatches',(req: Req, res: Res, next: Next) => {
        try {
            adminController.getUsers(req, res, next);
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
 */
    router.post(adminApis.approveStaff,  (req: Req, res: Res, next: Next) => {
        try {
            userController.savebasicProfile(req, res, next);
        } catch (error) {}
      });   

    return router
}