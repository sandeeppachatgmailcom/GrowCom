import { adminController, userController } from '../injection/injection'
import { Route, Req, Res, Next } from '../../entity/types/serverTypes'
import express, { Router } from 'express'; 

export function adminRouter(router: Router){
    router.get('/listBatches',(req:Req,res:Res,next:Next)=>{
        console.log('listBatches')
        adminController.getUsers(req,res,next)
    })
    router.get('/listpendingStaff',(req:Req,res:Res,next:Next)=>{
        console.log('listpendingStaff')
        adminController.getlistpendingStaff(req,res,next)
    })

    return router
}