import { Link } from "react-router-dom";
import React from 'react'
import { MdDone } from "react-icons/md";


const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center pt-12">
        <div className=" bg-green-500 p-3 rounded-full">
          <MdDone size={35} className="text-white"  />
        </div>
        <div className="flex flex-col items-center gap-y-3">
            <h2 className="mt-3 font-bold text-lg">Payment Done!</h2>
            <p>Thank you for completing your secure online payment.</p>
            <p>Have a Great Day!!</p>
        </div>

        <Link to={"/users/profile/me"}>
           <div className="mt-3 bg-blue-500 p-3  text-white border-b-4 border-blue-600 ">Go back to Bookings</div>
        </Link>
      
    </div>
  )
}

export default CheckoutSuccess