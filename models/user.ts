import {db} from "../config/db.config";
import { UsersProp } from "../types/user";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const User = {
    create: async (user: UsersProp, callback: Function) => {
        const str ="INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)"
        const salt = 10;
        db.query<ResultSetHeader>(
        str, 
        [user.firstName, user.lastName, user.email, user.password],
        (err, result) => {
            if (err) callback(err);
            const insertId = result.insertId;
            callback(null, insertId);
            }
        );
    },
    findById: (id: number, callback: Function) => {
        const str = `SELECT * FROM users WHERE id=?`
            
        db.query<RowDataPacket[]>(str, id, (err, result) => {
            if (err) callback(err)
            const row = result[0];
            callback(null, row);
        });
    },
    findByCondition: (user: {email: string}, callback: Function) => {
        const field = Object.keys(user);
        const value = Object.values(user);
        const str = `SELECT * FROM users WHERE ${field}=?`
            
        db.query<RowDataPacket[]>(str, value, (err, result) => {
            if (err) callback(err)
            const row = result[0];
            callback(null, row);
        });
    },
    findAll: (callback: Function) => {
        const str = `SELECT * FROM users`;

        db.query<RowDataPacket[]>(str, (err, result) => {
            if (err) callback(err)
            const rows = result;
            callback(null, rows);
        });
    },
    update: (user: UsersProp, id: string,  callback: Function) => {
        const strQueryParam = Object.keys(user).join("=?,") + "=?";
        const str = `UPDATE users SET ${strQueryParam} WHERE id=?`;
        
        const values: string[] = Object.values(user);
        values.push(id);
        db.query(str, values, (err, result) => {
            if (err) callback(err)
            callback(null);
            }
        );
    },
    delete: (id: string,  callback: Function) => {
        const str = `DELETE FROM users WHERE id=?`;
        db.query(str, [id], (err, result) => {
            if (err) callback(err)
            callback(null);
            }
        );
    }
};