import express from "express";
import { BlogController } from "../controllers/blog";
import { auth } from "../middleware/authentication";
const BlogRouter = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Blog_posts:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user (Auto incremented by MySQL)
 *         title:
 *           type: string
 *           description: The blog title
 *         content:
 *           type: string
 *           description: The blog content
 *         published:
 *           type: number
 *           description: blog publishing status (values are either 1 or 0)
 *         author:
 *           type: string
 *           description: The blog author
 *         createdAt:
 *           type: datetime
 *           description: Blog creation date
 *         updatedAt:
 *           type: datetime
 *           description: Blog update date
 *       example:
 *         id: 1
 *         title: A new dawn
 *         content: today is a new dawn
 *         published: 1
 *         author: F.Scott Fitzgerald
 *         createdAt: 2023-08-18 18:53:46
 *         updatedAt: 2023-08-18 18:53:46
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns a list of all the stories
 *     tags: [Get Blog Posts]
 *     responses:
 *       200:
 *         description: Returns the list of all the stories
 *         
 */
BlogRouter.get("/", BlogController.getBlogPosts);
/**
   * @openapi
   * '/posts/new-post':
   *  post:
   *     tags:
   *     - Create new blog post
   *     summary: Create a new post
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/Blog_posts'
   *     responses:
   *      200:
   *        description: Story posted successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Blog_posts'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
BlogRouter.post("/new-post", BlogController.createBlogPost);
/**
   * @openapi
   * '/posts/search':
   *  post:
   *     tags:
   *     - Search a post
   *     summary: Search for a post
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/Blog_posts'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Blog_posts'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
BlogRouter.post("/search", BlogController.searchBlogPost);
/**
 * @swagger
 * /posts/edit/{id}:
 *  put:
 *    summary: Update the blog post by the id
 *    tags: [Edit blog post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Blog_posts'
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog_posts'
 *      404:
 *        description: The post not found
 *      500:
 *        description: Some error happened
 */
BlogRouter.put("/edit/:id", BlogController.update);
/**
 * @swagger
 * /posts/delete/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Delete blog post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 * 
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: The post was not found
 */
BlogRouter.delete("/delete/:id", BlogController.delete);

export { BlogRouter };