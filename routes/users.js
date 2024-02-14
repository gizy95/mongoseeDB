import express from "express";
import { postUser, getUsers, getUser, modifyUser, modifyMultipleUsers, loginUser, registerUser } from "../controllers/usersController.js";
import { validateEmail } from "../middleware/emailCheck.js";


const userRoutes = express.Router();


userRoutes.get("/", getUsers)
userRoutes.get("/login", loginUser)
//userRoutes.get("/:id", getUser)
//userRoutes.post("/", validateEmail, postUser)
userRoutes.post("/", validateEmail, registerUser)
userRoutes.put("/:id", validateEmail, modifyUser)
userRoutes.delete("/:id")
userRoutes.put("/", modifyMultipleUsers)

export default userRoutes;