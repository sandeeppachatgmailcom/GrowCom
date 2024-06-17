import { tokenService, userController } from "../injection/injection";
import { Route, Req, Res, Next } from "../../entity/Types/ServerTypes";
import express, { Router } from "express";


 

export function authRouter(router: Router) {
  console.log('first')
  // @ts-ignore
  /**
   * @swagger
   * auth/validateOtp:
   *   post:
   *     summary: Validate the OTP with the email submitted by the user. ,
   *     description: Validates the one-time password (OTP) submitted by the user.This api is also used to resetpassword , the third field confirm that the user need to reset the password
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The email address to which the OTP was sent.
   *               otp:
   *                 type: string
   *                 description: The one-time password submitted by the user.
   *               resetPassword:
   *                 type: boolean
   *                 description: Indicates whether the user needs to reset the password after OTP validation.
   *     responses:
   *       '200':
   *         description: Successful validation
   *       '400':
   *         description: Invalid request body or OTP
   *       '500':
   *         description: Internal server error
 *     tags:
 *       - User
 */
  router.post("/validateOtp", (req: Req, res: Res, next: Next) => {
    try {
        userController.validateOtp(req, res, next);
    } catch (error) {}
  });  
 
  // @ts-ignore
  /**
   * @swagger
   * auth/resetPassword:
   *   post:
   *     summary: Reset Password
   *     description: Reset the password submitted by user with email.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The email address of the user .
   *               password:
   *                 type: string
   *                 description: confirmed password from the user .
   *     responses:
   *       '200':
   *         description: updated userRecord
   *       '404':
   *         description: email not existing on the server
   *       '500':
   *         description: Internal server error
 *     tags:
 *       - User
 */

  router.post("/resetPassword", (req: Req, res: Res, next: Next) => {
    try {
        userController.resetPassword(req, res, next);
    } catch (error) {}
  });   
  // @ts-ignore
  /**
   * @swagger
   * auth/createUser:
   *   post:
   *     summary: create a user (signup)
   *     description: create a user with minimal details , name, email, password & googleAuth are the field , if
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: name of the user .
   *               email:
   *                 type: string
   *                 description: email of  the user, its a unique field  .
   *                password:
   *                 type: string
   *                 description:passwor from the user,it should be a minimum 8 length alpha numeric string value  .
   *     responses:
   *       '200':
   *         description: updated userRecord
   *       '404':
   *         description: email not existing on the server
   *       '500':
   *         description: Internal server error
 *     tags:
 *       - User
 */
  router.post("/create", (req: Req, res: Res, next: Next) => {
    try {
        userController.createUser(req, res, next);
    } catch (error) {}
  });  
  /**
   * @swagger
   * /delete-user:
   *   delete:
   *     summary: Delete User
   *     description: Deletes a user account.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the user.
   *               email:
   *                 type: string
   *                 description: The email address of the user.
   *               password:
   *                 type: string
   *                 description: The password of the user.
   *               googleAuth:
   *                 type: boolean
   *                 description: Indicates whether the user is authenticated with Google.
   *     responses:
   *       '200':
   *         description: User deleted successfully.
   *         content:
   *           application/json:
   *             schema:
   *
   *       '400':
   *         description: Bad request - Invalid input or missing required fields.
   *       '404':
   *         description: User not found.
 *     tags:
 *       - User
 */
  router.get("/delete", tokenService.verifyToken, (req: Req, res: Res, next: Next) => {
    try {
       userController.createUser(req, res, next);
    } catch (error) {}
  }); 
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: User login
   *     description: Authenticate a user and generate a token for access.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The email address of the user.
   *               password:
   *                 type: string
   *                 description: The password of the user.
   *               googleAuth:
   *                 type: boolean
   *                 description: Indicates whether the user is authenticated with Google.
   *     responses:
   *       '200':
   *         description: Login successful. Returns user data with tokenService.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 email:
   *                   type: string
   *                   description: The email address of the user.
   *                 token:
   *                   type: string
   *                   description: The authentication token generated for the user.
   *                 active:
   *                   type: boolean
   *                   description: Indicates whether the user is active or not.
   *       '401':
   *         description: Unauthorized - Invalid email or password.
   *       '500':
   *         description: Internal server error.
 *     tags:
 *       - User
 */
  router.post("/login",tokenService.createJwtToken ,(req: Req, res: Res, next: Next) => {
    try {
        userController.login(req, res, next);
    } catch (error) {}
  });
  /**
   * @swagger
   * /getLogin:
   *   post:
   *     summary: Session-based login
   *     description: Authenticate a user and establish a session-based login.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The email address of the user.
   *               password:
   *                 type: string
   *                 description: The password of the user.
   *               googleAuth:
   *                 type: boolean
   *                 description: Indicates whether the user is authenticated with Google.
   *     responses:
   *       '200':
   *         description: Login successful. Returns user data with tokenService.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 email:
   *                   type: string
   *                   description: The email address of the user.
   *                 token:
   *                   type: string
   *                   description: The authentication token generated for the user.
   *                 active:
   *                   type: boolean
   *                   description: Indicates whether the user is active or not.
   *       '401':
   *         description: Unauthorized - Invalid email or password.
   *       '500':
   *         description: Internal server error.
 *     tags:
 *       - User
 */
  router.get("/getmylogin/:role",tokenService.verifyToken, (req: Req, res: Res, next: Next) => {
      try {
        console.log('hi i reached here ')
         userController.login(req, res, next);
      } catch (error) {}
    }
  );
  router.get("/user",(req: Req, res: Res, next: Next) => {
    try {
     userController.getUsers(req, res, next);
    } catch (error) {}
  }
);    
  /**
   * @swagger
   * /saveBasicInfo:
   *   post:
   *     summary: Save Basic User Information
   *     description: Updates basic user information and returns the updated user profile.
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               // Define properties of the request body here
   *     responses:
   *       '200':
   *         description: Basic information saved successfully. Returns the updated user profile.
   *         content:
   *           application/json:
   *             schema:
   *               // Define the schema of the response object representing the updated user profile
   *       '401':
   *         description: Unauthorized - Invalid or missing authentication tokenService.
   *       '500':
   *         description: Internal server error.
   *     tags:
 *       - User
 */
  router.post("/saveBasicInfo",(req: Req, res: Res, next: Next) => {
        try {
            userController.savebasicProfile(req, res, next);
        } catch (error) {}
      }
    );    
  /**
   * @swagger
   * /forgotPassword:
   *   post:
   *     summary: Forgot Password
   *     description: Sends a password reset email to the user's email address.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The email address of the user.
   *     responses:
   *       '200':
   *         description: Password reset email sent successfully.
   *       '404':
   *         description: User not found or email address not registered.
   *       '500':
   *         description: Internal server error.
  *     tags:
 *       - User
 */
  router.post("/forgotPassword",(req: Req, res: Res, next: Next) => {
    try {
        userController.forgotPassword(req, res, next);
    } catch (error) {}
  }
);     
    /**
 * @swagger
 * /auth/getSubmissionDetails:
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
  router.get("/getSubmissionDetails",tokenService.verifyToken,(req: Req, res: Res, next: Next) => {
    try {
      console.log('getSubmissionDetails route')
        userController.getSubmissionDetails(req, res, next);
    } catch (error) {}
  }
);

 /**
 * @swagger
 * /auth/getBatchWiseStudentsList:  # Corrected endpoint name (descriptive)
 *   get:
 *     summary: Get Student Task Progress Ratio
 *       # Description should reflect actual functionality
 *     description: This API retrieves a student's progress ratio on scheduled tasks based on their email address.
 *      
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
 *       - User   
 */

 router.get('/getBatchWiseStudentsList',(req: Req, res: Res, next: Next) => {
  try {
     
    userController.getBatchWiseStudentsList(req, res, next); 
  } catch (error) {}
}); 

/**
 * @swagger
 * /auth/getDesignationWiseStaffList:  # Corrected endpoint name (descriptive)
 *   get:
 *     summary: Get Student Task Progress Ratio
 *       # Description should reflect actual functionality
 *     description: This API retrieves a student's progress ratio on scheduled tasks based on their email address.
 *      
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
 *       - User   
 */

router.get('/getDesignationWiseStaffList',(req: Req, res: Res, next: Next) => {
  try {
     
    userController.getDesignationWiseStaffList(req, res, next); 
  } catch (error) {}
}); 

  return router;
}
