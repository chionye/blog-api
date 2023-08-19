import {db} from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { BlogPostsProp } from './../types/blog_posts';

export const Blog = {
    create: async (blog: BlogPostsProp, callback: Function) => {
        const str ="INSERT INTO blog_posts (title, content, author, published) VALUES (?,?,?,?)"

        db.query<ResultSetHeader>(
        str, 
        [blog.title, blog.content, blog.author, blog.published],
        (err, result) => {
            if (err) callback(err);
            const insertId = result.insertId;
            callback(null, insertId);
            }
        );
    },
    findById: (id: number, callback: Function) => {
        const str = `SELECT * FROM blog_posts WHERE id=?`
            
        db.query<RowDataPacket[]>(str, id, (err, result) => {
            if (err) callback(err)
            const row = result[0];
            callback(null, row);
        });
    },
    findBySearchKey: (user: BlogPostsProp, callback: Function) => {
        const searchParam = Object.keys(user).join(" LIKE ? OR ") + " LIKE ?";
        const values = Object.values(user).map((search) => "%"+search+"%");
        const str = `SELECT * FROM blog_posts WHERE ${searchParam}`;
        
        db.query<RowDataPacket[]>(str, values, (err, result) => {
            if (err) callback(err)
            const row = result[0];
            callback(null, row);
        });
    },
    findAll: (callback: Function) => {
        const str = `SELECT * FROM blog_posts`;

        db.query<RowDataPacket[]>(str, (err, result) => {
            if (err) callback(err)
            const rows = result;
            callback(null, rows);
        });
    },
    update: (user: BlogPostsProp, id: string,  callback: Function) => {
        const strQueryParam = Object.keys(user).join("=?,") + "=?";
        const str = `UPDATE blog_posts SET ${strQueryParam} WHERE id=?`;
        
        const values: string[] = Object.values(user);
        values.push(id);
        db.query(str, values, (err, result) => {
            if (err) callback(err)
            callback(null);
            }
        );
    },
    delete: (id: string,  callback: Function) => {
        const str = `DELETE FROM blog_posts WHERE id=?`;
        db.query(str, [id], (err, result) => {
            if (err) callback(err)
            callback(null);
            }
        );
    }
};