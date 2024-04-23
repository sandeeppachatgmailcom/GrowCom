import { Request as req ,Response as res,NextFunction as next } from "express";



export const isAuthenticated = async (req:req,res:res,next:next)=>{

    const acceToken = req.cookies.acceToken as string
    const refreshToken = req.cookies.refreshToken as string;


}
