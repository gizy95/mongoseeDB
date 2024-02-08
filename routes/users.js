import express from "express";
import { postUser, getUsers, getUser, modifyUser, modifyMultipleUsers } from "../controllers/usersController.js";
import { validateEmail } from "../middleware/emailCheck.js";


const userRoutes = express.Router();


userRoutes.get("/", getUsers)
userRoutes.get("/:id", getUser)
userRoutes.post("/", validateEmail, postUser)
userRoutes.put("/:id", validateEmail, modifyUser)
userRoutes.delete("/:id")
userRoutes.put("/", modifyMultipleUsers)

export default userRoutes;