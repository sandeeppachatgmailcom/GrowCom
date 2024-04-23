import { Route, Req, Res, Next } from '../../entity/types/serverTypes'

export interface interFaceToken {
        
        verifyToken(req:Req,res:Res,next:Next):Promise<Next|void>
        createJwtToken(req:Req,res:Res,next:Next):Promise<Next|void>
}