import express from "express";
import { BlogController } from "../controllers/blog";
import { auth } from "../middleware/authentication";
const BlogRouter = express.Router();

BlogRouter.get("/", BlogController.getBlogPosts);
BlogRouter.post("/new-post", BlogController.createBlogPost);
BlogRouter.post("/search", BlogController.searchBlogPost);
BlogRouter.put("/edit/:id", BlogController.update);
BlogRouter.delete("/delete/:id", BlogController.delete);

export { BlogRouter };