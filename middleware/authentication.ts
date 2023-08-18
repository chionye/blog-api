import * as jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import { User } from "../models/user";
import { RowDataPacket } from "mysql2";
import { JwtProp } from "../types/jwt";

export const auth = (req:Request, res: Response, next: NextFunction) => {
    const idToken: any = req.header('Authorization')?.replace('Bearer ','');
    const decoded = jwt.verify(idToken, "secret") as JwtProp;
    const id = decoded.id;
    
    User.findById(parseInt(id),(err: Error, result: RowDataPacket )=>{
        if(err) return res.status(400).send({message:err.message})

        if(!result) return res.status(401).send({ message:'Please log in!' });

        return next();
    });
}