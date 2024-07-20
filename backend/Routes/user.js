 import express from "express"
 import { updateUser, deleteUser, getAllUsers, getSingleUser, getUserProfile, getMyAppointments } from "../Controllers/userController.js ";
 import { auth, isAdmin, isPatient, isDoctor } from "../middlewares/auth.js";
 
 const router = express.Router();

 router.get("/:id", auth, isPatient, getSingleUser);
 router.get("/", auth, getAllUsers);
 router.put("/:id", auth, isPatient, updateUser);
 router.delete("/:id", auth, isPatient, deleteUser);
 router.get("/profile/me", auth, isPatient, getUserProfile);
 router.get("/appointments/my-appointments", auth, isPatient, getMyAppointments);

 export default router 