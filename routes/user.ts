import express from "express";
import { UserController } from "../controllers/user";
import { auth } from "../middleware/authentication";
const UserRouter = express.Router();

UserRouter.get("/", auth, UserController.getUsers);
UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);
UserRouter.put("/edit/:id", auth, UserController.update);
UserRouter.delete("/delete/:id", auth, UserController.delete);

export { UserRouter };