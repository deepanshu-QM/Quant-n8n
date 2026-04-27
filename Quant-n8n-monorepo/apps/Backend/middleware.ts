
import type {NextFunction, Request,Response} from "express";
import jwt , {type JwtPayload} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function authMiddleware(req:Request, res:Response, next:NextFunction){
    const header = req.headers["authorization"] as string;

    if(!header){
        return res.status(403).json({            
            message : "Authorization is missing"
        });
    } 

    try {
        console.log(header)
        const token = header.split(" ")[1]       
        if(!token){
            return res.status(403).json({
                message : "Token missing"
            });
        } 
        const response = jwt.verify(token, JWT_SECRET) as JwtPayload;  /*response = decoded*/
        req.userId = response.id;
        next();
    }
    catch(e){
        res.status(403).json({
            message : "You are not Logged in"
        })
    }
}