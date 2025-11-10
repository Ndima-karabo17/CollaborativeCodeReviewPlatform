import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { findProfileByEmail } from "../service/profileService";
import { Profile } from "../types/profile.types";

interface jwtPayload {
    profileId: number,
    email: string
}

export const protect = async(req:Request,res:Response, next:NextFunction) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            console.log(req.headers, 'request headers')
            console.log(req.headers.authorization, 'token')
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
            console.log(decoded, 'decoded token');

            const profile:Profile|null = await findProfileByEmail(decoded.email)
            req.profile = profile || undefined
            if(!req.profile){
                return res.status(401).json({message: 'Not authorize, profile not found'});

            }
            return next();
        } catch (error) {
            res.status(401).json({message: 'Not authorized, token failed'});
        }
    }else{
        return res.status(401).json({message: 'Not authorized, no token'});

    }
    return res.status(401).json({message: 'Not authorized'});
}