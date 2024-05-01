import { TokenServises } from '../../entity/services/tokenServises';
import jwt from 'jsonwebtoken'
import { Route, Req, Res, Next } from '../../entity/Types/ServerTypes'
import dotenv from "dotenv";
export class JwtToken_Adapter implements TokenServises{
     
    constructor(){
        dotenv.config();
    }

    async createJwtToken(req:Req,res:Res,next:Next):Promise<Next|void>{
        console.log(req.body,'request body at token manager')
        const token =await jwt.sign({ email: req.body.email, sessionID: req.sessionID,googleAuth:true }, process.env.JWT_VERIFICATION_KEY as string , { expiresIn: '600m' });
        console.log(token,'tokentokentokentokentoken')
        req.body.token={token:token} 
        next()
    }
  
    async verifyToken(req:Req,res:Res,next:Next):Promise<Next|void>{
        const token = req.cookies['manGrow']
        console.log(req.body,'token, process.env.JWT_VERIFICATION_KEY ')
        if(token){
             const verified = await jwt.verify(token, process.env.JWT_VERIFICATION_KEY  as string);
             const temp = {
                ...req.body,
                ...JSON.parse(JSON.stringify(verified))
            };
            req.body= temp;
            console.log(temp,'temptemptemptemptemp')
            next()
            }
            else{
                res.json({success:false,message:'session Expired , please try again'})
            }
        
    }

}