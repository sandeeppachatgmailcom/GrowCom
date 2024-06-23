

import { Route, Req, Res, Next } from '../../entity/Types/Serv_erTypes'
import { authRouter } from './authentication';
import express, { Application } from 'express'; // Importing Application type from express  
import { Router } from 'express';
import { adminRouter } from './adminRoute';
import { utilRouter } from './utilityRoute';
import { trainerRouter } from './trainerRoute';
import { studentsRouter } from './studentsRoute';
import { chatRouter } from './chatRoute';

export const allRoutes = {
    ...adminRouter,
    ...authRouter
  };
  
export function mainRoute(router:Route) {
    router.use('/auth', authRouter(express.Router()));
    router.use('/admin', adminRouter(express.Router()));
    router.use('/utils', utilRouter(express.Router()))
    router.use('/trainer',trainerRouter(express.Router()))
    router.use('/student',studentsRouter(express.Router()))
    router.use('/chat',chatRouter(express.Router()))
    return router;
}
 