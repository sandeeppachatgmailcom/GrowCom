import { userController } from '../injection/injection'
import { Route, Req, Res, Next } from '../../entity/types/serverTypes'
import express, { Router } from 'express'; 
import { JwtTokenHandler } from '../services/jwtTokenhandler';
const token = new  JwtTokenHandler ()


export function authRouter(router: Router){
    router.post('/validateOtp',(req: Req, res: Res, next: Next)=>{
        userController.validateOtp(req,res,next)
    });

    router.post('/resetPassword',(req:Req,res:Res,next:Next)=>{
        userController.resetPassword(req,res,next)
        
    })

    router.post("/create", (req:Req,res:Res,next:Next)=>{
        userController.createUser(req,res,next)
    });

    router.get("/delete", (req:Req,res:Res,next:Next)=>{
        userController.createUser(req,res,next)
    });

    router.post("/login",token.createJwtToken,(req:Req,res:Res, next:Next)=>{
        console.log('post login')
        userController.login(req,res,next)
    });


    router.get('/getlogin',token.verifyToken,(req:Req,res:Res, next:Next)=>{
        userController.login(req,res,next)
    }); 
    router.get('/user',(req:Req,res:Res, next:Next)=>{
        userController.getUsers(req,res,next)
    });

    router.post('/saveBasicInfo',(req:Req,res:Res, next:Next)=>{
       console.log('reached router')
        userController.savebasicProfile(req,res,next)
    });
    router.post('/forgotPassword',(req:Req,res:Res, next:Next)=>{
        console.log('reached router')
         userController.forgotPassword(req,res,next)
         
     });

    return router;
} 
