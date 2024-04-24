
import { userController } from '../injection/injection'
import { Route, Req, Res, Next } from '../../entity/types/serverTypes'
import { authRouter } from './authentication';
import express, { Application } from 'express'; // Importing Application type from express  
import { Router } from 'express';
import { adminRouter } from './adminRoute';
import { JwtTokenHandler } from '../services/jwtTokenhandler';
const token = new  JwtTokenHandler ()

export const allRoutes = {
    ...adminRouter,
    ...authRouter
  };
  

export function mainRoute(router:Route) {
    
    
    router.use('/auth', authRouter(express.Router()));
    router.use('/admin', adminRouter(express.Router()));
    return router;
}
 