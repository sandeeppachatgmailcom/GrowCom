import { Route, Req, Res, Next } from '../../frameworks/ServerTypes'

export interface TokenServises {
        verifyToken(req: Req, res: Res, next: Next): Promise<Next | void> 
        createJwtToken(req: Req & {sessionID?:string} , res: Res, next: Next): Promise<Next | void> 
}