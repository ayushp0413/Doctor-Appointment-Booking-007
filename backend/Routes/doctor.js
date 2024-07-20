import express from "express"
import { updateDoctor, deleteDocter , getAllDoctors, getSingleDoctor, getDoctorProfile } from "../Controllers/doctorController.js ";
import reviewRouter from "./review.js"
import { auth, isAdmin, isDoctor, isPatient } from "../middlewares/auth.js";


const router = express.Router();

// nested router
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/:id", auth, isDoctor, updateDoctor);
router.delete("/:id", auth, isDoctor, deleteDocter);
router.get("/profile/me", auth, isDoctor, getDoctorProfile);

export default router 