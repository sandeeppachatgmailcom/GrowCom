import { Router } from "express";
import { Next, Req, Res } from "../ServerTypes";
import { studentsController } from "../injection/injection";

export function studentsRouter(router: Router) {

    /**
     * @swagger
     * /student/postStudentsTask:
 *   post:
 *     summary: Get scheduled tasks for a student within a date range
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the student to fetch tasks for
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the range to fetch tasks for (YYYY-MM-DD)
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the range to fetch tasks for (YYYY-MM-DD)
 *             required:
 *               - email
 *               - startDate
 *               - endDate
 *     responses:
 *       '200':
 *         description: Array of task list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScheduledTask'
 *       '400':
 *         description: Bad request. Invalid input parameters.
 *       '404':
 *         description: Student not found.
 *       '500':
 *         description: Internal server error. Failed to fetch tasks.
     *     tags:
     *       - Student
     */

    router.post('/postStudentsTask', (req: Req, res: Res, next: Next) => {
        try {
          studentsController.postStudentsTask(req, res, next)
        } catch (error) {
          
        }
    })




    /**
 * @swagger
 * /student/submitTask:
 *   post:
 *     summary: Submit a task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubmissionModel'
 *     responses:
 *       '200':
 *         description: Task submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubmitTaskResponse'
 *       '400':
 *         description: Bad request. Invalid input parameters.
 *       '500':
 *         description: Internal server error. Failed to submit task.
 *     tags:
 *       - Student
 */

// Uncomment the following section to include additional attributes in the response
/*
components:
  schemas:
    SubmissionModel:
      type: object
      properties:
        submissionId:
          type: string
        taskId:
          type: string
        studentId:
          type: string
        scheduledTaskId:
          type: string
        WriteTask:
          type: string
        Reading:
          type: string
        Speaking:
          type: string
        deleted:
          type: boolean
        active:
          type: boolean
      required:
        - submissionId
        - taskId
        - studentId
        - scheduledTaskId
        - WriteTask
        - Reading
        - Speaking
        - deleted
        - active

    SubmitTaskResponse:
      type: object
      properties:
        status:
          type: boolean
        message:
          type: string
      required:
        - status
        - message
*/
    router.post('/submitTask', (req: Req, res: Res, next: Next) => {
        try {
          const result =  studentsController.postSubmitStudentTask( req,res,next  )
         
        } catch (error) {
          
        }
    })


    return router
}
