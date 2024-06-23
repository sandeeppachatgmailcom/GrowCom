import { Route, Req, Res, Next } from '../Types_1/ServerTypes'

export interface TokenServises {
        
        verifyToken(req:Req,res:Res,next:Next):Promise<Next|void>
        createJwtToken(req:Req,res:Res,next:Next):Promise<Next|void>
}