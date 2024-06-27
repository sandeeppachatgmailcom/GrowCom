import { TokenServises } from "../../entity/services/tokenServises";
import jwt from "jsonwebtoken";
import { Route, Req, Res, Next } from "../ServerTypes";
import dotenv from "dotenv";
import { UserRepository } from "../../entity/repository/userRepository"; 
export class JwtToken_Adapter implements TokenServises {
  constructor(private userRepo: UserRepository) {
    dotenv.config();
  }

  async logout(req: Req, res: Res) {
    try {
      const cookieName = req.body.cookieName; // Assuming cookie name comes from request body
  
      // Check if the cookie exists before clearing
      if (req.cookies && req.cookies[cookieName]) {
        res.clearCookie(cookieName);
      } else {
        console.log(`Cookie "${cookieName}" not found.`);
      }
  
      res.status(200).json("Logged Out Successfully");
    } catch (error) {
      console.log(error);
    }
  }






  async createJwtToken(req: Req & {sessionID?:string} , res: Res, next: Next): Promise<Next | void> {
    const token = await jwt.sign(
      { email: req.body.email, sessionID: req?.sessionID  , googleAuth: true },
      process.env.JWT_VERIFICATION_KEY as string,
      { expiresIn: "600m" }
    );
    req.body.token = { token: token };
    next();
  }

  async verifyToken(req: Req, res: Res, next: Next): Promise<Next | void> {
    try {
      const param = req.params;
      const token = req.cookies[param.role];
      console.log( 'f',token,  'How Many Token are there ')
      if (token) {
        const verified =  jwt.verify(
          token,
          process.env.JWT_VERIFICATION_KEY as string
        );
        
        if (verified) {
           
          const temp = {
            ...req.body,
            ...JSON.parse(JSON.stringify(verified)),
          };
          req.body = temp;
          next();
        } else {
           
          res.json({
            success: false,
            message: "session Expired , please try again",
          });
        }

        
      } else {
        res.json({
          success: false,
          message: "session Expired , please try again",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "session Expired , please try again",
      });
    }
  }
}
