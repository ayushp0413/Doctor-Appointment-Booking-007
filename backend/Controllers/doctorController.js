import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor =  async(req,res)=>{
    const id = req.params.id;
    
    try
    {

        const updateDoctor = await Doctor.findByIdAndUpdate(id, {$set:req.body}, {new:true});

        res.status(200).json({
            success:true,
            message:"Successfully updated",
            data:updateDoctor,
        })

    }catch(err)
    {
        
        res.status(500).json({
            success:false,
            message:"Failed to updated",
        })

    }
}

export const deleteDocter =  async(req,res)=>{
    const id = req.params.id;
    
    try
    {

        await Doctor.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Successfully deleted",
        })

    }catch(err)
    {
        
        res.status(500).json({
            success:false,
            message:"Failed to delete",
        })

    }
}

export const getSingleDoctor =  async(req,res)=>{
    const id = req.params.id;

    try
    {
        const doctor = await Doctor.findById(id)
        .populate('reviews').select("-password"); 

        res.status(200).json({
            success:true,
            message:"User found Successfully ",
            data: doctor,
        })

    }catch(err)
    {  
        res.status(404).json({
            success:false,
            message:"No user Found",
        })
    }
}

export const getAllDoctors =  async(req,res)=>{
    
    try
    {
        const  query  = req.params.input;
        let doctors;
        
        if(query)
        {
            doctors = await Doctor.find({
                isApproved:"approved",
                $or: [
                    {name:{ $regex: query, $options: "i" } },
                    {specialization: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        }
        else
        {
            doctors = await Doctor.find({isApproved: "approved"}).select("-password");
        }

        res.status(200).json({
            success:true,
            message:"Doctors found Successfully ",
            data: doctors,
        })

    }catch(err)
    {  
        res.status(404).json({
            success:false,
            message:"Not Found",
        })
    }
}






export const createDoctor = async (req, res) => {
    try{

        const { doctorId, qualification, bio, specialization, experiences, virtualCare, about, timeSlots, phone, ticketPrice, patientCapacity, dailyPatientCount, address, } = req.body;


        const existingDoctor = await Doctor.findById({_id: doctorId})

        const existingAdditionDetails =  await DoctorDetails.findById({_id:existingDoctor.additionalDetails});

        existingAdditionDetails.phone = phone;
        existingAdditionDetails.qualification = qualification;
        existingAdditionDetails.bio = bio;
        existingAdditionDetails.specialization = specialization;
        existingAdditionDetails.experiences = experiences;
        existingAdditionDetails.virtualCare = virtualCare;
        existingAdditionDetails.about = about;
        existingAdditionDetails.timeSlots = timeSlots;
        existingAdditionDetails.ticketPrice = ticketPrice;
        existingAdditionDetails.patientCapacity = patientCapacity;
        existingAdditionDetails.dailyPatientCount = dailyPatientCount;
        existingAdditionDetails.address = address;

        await existingAdditionDetails.save();


        res.status(200).json({
            success: true,
            message: "Doctor created",
            details: existingAdditionDetails,
        })


    }catch(err){
        res.status(500).json({
            success:false,
            message:"Failed to created",
        })

    }

}

export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId;

    try {
        const doctor = await Doctor.findById(doctorId).populate("additionalDetails").exec();

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        const { password, ...rest } = doctor._doc;

        const appointments = await Booking.find({ doctor: doctorId });

        res.status(200).json({
            success: true,
            message: "Profile info is getting",
            data: { ...rest, appointments },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
    }
};

