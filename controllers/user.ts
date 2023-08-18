import {Request, Response} from "express";
import { User } from '../models/user';
import { UsersProp } from "../types/user";

const UserController = {
    register: async (req: Request, res: Response) => {
        const newUser: UsersProp = req.body;
        await User.create(newUser, (err: Error, id: number) => {
            if (err) return res.status(500).json({"message": err.message});
            return res.status(200).json({"userId": id});
        });
    },
    
}

export { UserController };