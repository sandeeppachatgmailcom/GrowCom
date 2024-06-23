import express, { Router } from "express";
import { Next, Req, Res, Route } from "../../entity/Types/ServerTypes";
import { chatController } from "../injection/injection";

export function chatRouter(router: Router) {
  /**
/**
 * @swagger
 * /chat/intiateConversation:
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
 *       - Chat
 */

  router.post("/intiateConversation",
    async (req: Req, res: Res, next: Next) => {
      try {
        await chatController.createConversation(req, res, next);
      } catch (error) {}
    }
  );
/**
/**
 * @swagger
 * /chat/sendMessage:
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
 *       - Chat
 */
  router.post('/sendMessage', async (req: Req, res: Res, next: Next) => {
    try {
       await chatController.saveMessage( req, res , next);

    } catch (error) {
      
    }
  })

 



  return router
}

