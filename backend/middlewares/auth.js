import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();

export const auth = async(req,res,next)=>{
    try
    {
        // fecth token from req and authorize it
        const token = req.cookies.jwt 
                      || req.body.token 
                      || req.header("Authorization").replace("Bearer ","");

        if(!token)
        {
            res.status(401).json({
                success:false,
                message:"Token Missing",
            });
        }
        // verify this token 
        try
        {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = payload.id; 
            req.role = payload.role;

        }catch(err)
        {
            res.status(500).json({
                success:false,
                message:"Token is invalid brother ",
            })
        }

        next();
     
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal sever error in auth middleware"
        })   
    }
}

export const isPatient = async(req,res,next)=>{
    try
    {
        if(req.role!=="patient")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Patient."
            })
        }
        next();
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Patient"
        })
    }
}

export const isDoctor = async(req,res,next)=>{
    try
    {
        if(req.role!=="doctor" || req.role!=='Doctor')
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Doctor."
            })
        }
        next();
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Doctor"
        })
    }
}

export const isAdmin = async(req,res,next)=>{
    try
    {
        if(req.role!=="admin")
        {
            res.status(401).json({
                success:false,
                message:"This Page is protected for you. You are not Admin"
            })
        }
        next();

    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Internal issue in Admin"
        })
    }
}