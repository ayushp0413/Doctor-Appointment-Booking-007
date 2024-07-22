import express from 'express'
import { createReview, getAllReviews } from '../Controllers/reviewController.js'
import { auth, isAdmin, isDoctor, isPatient } from '../middlewares/auth.js';
const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(getAllReviews)
    .post(auth, createReview) 

export default router    