import { toast } from "react-toastify";
import { BASE_URL , token } from "../config"


const deleteAccount = async(userData) => {


    try
    {
        if(userData?.role === "patient"){
            const res = await fetch(`${BASE_URL}/users/${userData?._id}`,{
                method:'delete',
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}`
                }
               });

               const result = res.json();
               
                if(!res.ok){
                    throw new Error(result.message)
                }
        }

        if(userData?.role === "doctor"){
            const res = await fetch(`${BASE_URL}/doctors/${userData?._id}`,{
                method:'delete',
                headers:{
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}`
                }
               });

               const result = res.json();
               
                if(!res.ok){
                    throw new Error(result.message)
                }
        }
     
    
    }catch(err)
    {
        console.log(err.message)
        toast.error(err.message);
    }

}


export default deleteAccount