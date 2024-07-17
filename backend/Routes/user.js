 import express from "express"
 import { updateUser, deleteUser, getAllUsers, getSingleUser } from "../Controllers/userController.js ";
 import { auth, isAdmin, isPatient, isDoctor } from "../middlewares/auth.js";
 
 const router = express.Router();

 router.get("/:id", auth, isPatient, getSingleUser);
 router.get("/", auth, getAllUsers);
 router.put("/:id", auth, isPatient, updateUser);
 router.delete("/:id", auth, isPatient, deleteUser);

 export default router 