import {Request, Response} from "express";
import { User } from '../models/user';
import { UsersProp  } from "../types/user";
import { RowDataPacket } from "mysql2";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


const UserController = {
    getUsers: (req: Request, res: Response) => {
        User.findAll((err: Error, result: RowDataPacket) => {
            if(err) return res.status(400).send({ message: err.message });
            
            return res.status(200).send({ userData: result });
        })
    },
    register: async (req: Request, res: Response) => {
        const newUser: UsersProp = req.body;

        if (!newUser.email) {
            return res.status(400).send({
                message: 'Please enter your email'
            });
        }

        if (!newUser.firstName) {
            return res.status(400).send({
                message: 'Please enter your firstname'
            });
        }

        if (!newUser.lastName) {
            return res.status(400).send({
                message: 'Please enter your lastname'
            });
        }

        if (!newUser.password) {
            return res.status(400).send({
                message: 'Please enter your password'
            });
        }

        User.findByCondition({email: newUser.email}, async (err: Error, result: RowDataPacket) => {
            if(err) return res.status(400).send({message:err.message});
            console.log(result)
            if (result) return res.status(409).send({message: 'This email is already in use!'});

            bcrypt.hash(newUser.password, 10, function(err, hash) {
                if (err) return res.status(400).json({"message": err.message});
                newUser.password = hash;
                User.create(newUser, (err: Error, id: number) => {
                    if (err) return res.status(400).json({"message": err.message});
                    User.findById(id, (err: Error, result: RowDataPacket) => {
                        if (err) return res.status(400).json({message: err.message});
                        return res.status(201).send({ userdata:result, message:"Registration successful"})
                    })
                })
            });
        });
    },
    login: (req: Request, res: Response) => {
        const user: UsersProp= req.body;
        
        if(user.email.trim() ===''|| user.password.trim() ===''){
            return res.status(400).send({message:"Email or password cannot be empty"})
        }

        User.findByCondition({email: user.email},(err: Error, result: RowDataPacket) => {
            if(err) return res.status(400).send({ message: err.message });
            
            if(!result) return res.status(401).send({ message:'Email or password is incorrect' });
            
            bcrypt.compare(user.password, result.password).then((isMatch) => {
                if(!isMatch) return res.status(401).send({ message:"Email or Password is incorrect"});

                const token = jwt.sign({ id: result.id.toString() }, "secret"); 
                return res.status(200).send({ message: "User logged in successfully", user: result, token});
            })
        })
    },
    update: (req: Request, res: Response) => {
        const user = req.body;
        const id = req.params.id;

        User.update(user, id, (err: Error, result: RowDataPacket) => {
            if(err) return res.status(400).send({ message: err.message });

            User.findById(parseInt(id),(err: Error, result: RowDataPacket )=>{
                if(err) return res.status(400).send({message:err.message})

                return res.status(200).send({ message: "User updated successfully", userData: result});
            });
        })
    },
    delete: (req: Request, res: Response) => {
        const id = req.params.id;

        User.delete(id, (err: Error, result: RowDataPacket) => {
            if(err) return res.status(400).send({ message: err.message });
            
            return res.status(200).send({ message: "User deleted successfully", userData: result});
        })
    },
}

export { UserController };