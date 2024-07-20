import User from "../models/UserSchema.js"
import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js"
import Stripe from "stripe"


export const getCheckoutSession = async (req, res) => {
    try
    {

        const doctorId = req?.params.doctorId;
        const doctor = await Doctor.findById(doctorId);   
        const user = await User.findById(req.userId);


        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        // creating session
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            success_url:`${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url:`${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email:user.email,
            client_reference_id: req.params.doctorId,
            line_items:[
                {

                    price_data:{
                        currency:'bdt',
                        unit_amount: doctor.ticketPrice * 100,
                        product_data: {
                            name: doctor.name,
                            description: doctor.bio,
                            images : [doctor.photo],
                        }
                    },
                    quantity:1,
                }
            ]
        })

     
        // creating booking
        const booking = new Booking({
            doctor:doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: session._id       
        })

        await booking.save();



        res.status(200).json({
            success: true,
            message: "Successfully Paid",
            session,
        })

    }catch(err)
    {
        res.status(500).json({

            success: false,
            message: "Error in creating checkout session",
            error: err.message,
        })
    }

}