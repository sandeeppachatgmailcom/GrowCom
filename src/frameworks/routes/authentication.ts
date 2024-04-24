import { userController } from "../injection/injection";
import { Route, Req, Res, Next } from "../../entity/types/serverTypes";
import express, { Router } from "express";
import { JwtTokenHandler } from "../services/jwtTokenhandler";

const token = new JwtTokenHandler();

export function authRouter(router: Router) {
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
   */

  router.get("/delete", token.verifyToken, (req: Req, res: Res, next: Next) => {
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
   *         description: Login successful. Returns user data with token.
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
   */
  router.post("/login",token.createJwtToken ,(req: Req, res: Res, next: Next) => {
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
   *         description: Login successful. Returns user data with token.
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
   */

  router.get("/getlogin",token.createJwtToken,(req: Req, res: Res, next: Next) => {
      try {
        token.verifyToken, userController.login(req, res, next);
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
   *         description: Unauthorized - Invalid or missing authentication token.
   *       '500':
   *         description: Internal server error.
   */

  router.post(
    "/saveBasicInfo",token.verifyToken,(req: Req, res: Res, next: Next) => {
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
   */
  router.post("/forgotPassword",(req: Req, res: Res, next: Next) => {
    try {
        userController.forgotPassword(req, res, next);
    } catch (error) {}
  }
);     

  return router;
}
