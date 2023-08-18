import express from "express";
import { UserController } from "../controllers/user";
import { auth } from "../middleware/authentication";
const router = express.Router();

router.get("/", auth, UserController.getUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/edit/:id", auth, UserController.update);
router.delete("/delete/:id", auth, UserController.delete);

export { router };