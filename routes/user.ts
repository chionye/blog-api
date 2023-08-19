import express from "express";
import { UserController } from "../controllers/user";
import { auth } from "../middleware/authentication";
const UserRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user (Auto incremented by MySQL)
 *         firstName:
 *           type: string
 *           description: The users firstname
 *         lastName:
 *           type: string
 *           description: The users lastname
 *       example:
 *         id: 1
 *         firstName: Valentine
 *         lastName: Michael
 *         email: michael.chionye@gmail.com
 *         password: your_password
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns a list of all the users
 *     tags: [Get Users]
 *     responses:
 *       200:
 *         description: Returns the list of all the users
 *         
 */
UserRouter.get("/", UserController.getUsers);
/**
   * @openapi
   * '/users/register':
   *  post:
   *     tags:
   *     - Register User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/Users'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Users'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
UserRouter.post("/register", UserController.register);
/**
   * @openapi
   * '/users/login':
   *  post:
   *     tags:
   *     - User Login
   *     summary: User login
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/Users'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Users'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
UserRouter.post("/login", UserController.login);
/**
 * @swagger
 * /users/edit/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Edit Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
UserRouter.put("/edit/:id", auth, UserController.update);
/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete user account
 *     tags: [Delete User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
UserRouter.delete("/delete/:id", auth, UserController.delete);

export { UserRouter };