import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
import bookingRoute from "./Routes/booking.js"


dotenv.config();

const app = express();
const port = process.env.PORT || 5000

const corsOptions = {
    origin:true
}

// connections
mongoose.set('strictQuery', false);
const dbConnect = () =>{
    try{
        mongoose.connect(process.env.DATABASE_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,    
        })
        .then(console.log("Database connection established successfully!"))
        .catch((err)=>{
            console.error(err);
            console.log("Database connection failed!");
            process.exit(1);
        })

    }catch(err)
    {
        console.log("Database connection failed!");
    }
}


// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

// routing 
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/doctors', doctorRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/bookings', bookingRoute)




app.listen(port , () => {
    console.log("Server is ready at port "+ port);
    dbConnect();
})



app.get("/", (req, res) => {
    res.send(`<h1> Server is up ans running`)
})
