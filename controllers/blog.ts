import {Request, Response} from "express";
import { Blog } from '../models/blog';
import { RowDataPacket } from "mysql2";
import { BlogPostsProp } from './../types/blog_posts';


const BlogController = {
    getBlogPosts: (req: Request, res: Response) => {
        Blog.findAll((err: Error, result: RowDataPacket) => {
            if(err) return res.status(400).send({ message: err.message });
            
            return res.status(200).send({ blogPosts: result });
        })
    },
    createBlogPost: async (req: Request, res: Response) => {
        const newBlogPost: BlogPostsProp = req.body;

        if (!newBlogPost.title) {
            return res.status(400).send({
                message: 'Please enter your email'
            });
        }

        if (!newBlogPost.content) {
            return res.status(400).send({
                message: 'Please enter your firstname'
            });
        }

        if (!newBlogPost.author) {
            return res.status(400).send({
                message: 'Please enter your lastname'
            });
        }
        Blog.create(newBlogPost, (err: Error, id: number) => {
            if (err) return res.status(400).json({"message": err.message});
            Blog.findById(id, (err: Error, result: RowDataPacket) => {
                if (err) return res.status(400).json({message: err.message});
                return res.status(201).send({ blogPost: result, message:"Story posted successful"})
            })
        })
    },
    searchBlogPost: (req: Request, res: Response) => {
        const post = req.body;

        Blog.findBySearchKey(post, (err: Error, result: RowDataPacket) => {
            if(err) return res.status(400).send({ message: err.message });

            return res.status(200).send({ blogPost: result});
        })
    },
    update: (req: Request, res: Response) => {
        const post = req.body;
        const id = req.params.id;

        Blog.update(post, id, (err: Error, result: RowDataPacket) => {
            if(err) return res.status(400).send({ message: err.message });

            Blog.findById(parseInt(id),(err: Error, result: RowDataPacket )=>{
                if(err) return res.status(400).send({message:err.message})

                return res.status(200).send({ message: "Blog post updated successfully", blogPost: result});
            });
        })
    },
    delete: (req: Request, res: Response) => {
        const id = req.params.id;

        Blog.delete(id, (err: Error, result: RowDataPacket) => {
            if(err) return res.status(400).send({ message: err.message });
            
            return res.status(200).send({ message: "Blog post deleted successfully"});
        })
    },
}

export { BlogController };