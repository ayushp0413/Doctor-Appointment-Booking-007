import express from "express"
import { getCheckoutSession } from "../Controllers/bookingContoller.js"
import { auth, isPatient } from "../middlewares/auth.js";

const router = express.Router()

router.post("/checkout-session/:doctorId", auth, isPatient, getCheckoutSession)

export default router