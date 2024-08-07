
import {useContext} from 'react'
import { BiMenu } from 'react-icons/bi'
import { authContext } from '../../Context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import deleteAccount from '../../hooks/deleteAccout'

const Tabs = ({ tab, setTab, data }) => {

    const {dispatch} = useContext(authContext)
    const navigate = useNavigate()

    console.log("TABS TABS : ", data);


    const handleLogout = () =>{
        dispatch({type: 'LOGOUT'})
        navigate('/')
        toast.success("Logout Successfull");
    }

    const handleDelete =() => {
        deleteAccount(data);
        dispatch({type:"LOGOUT"})
        toast.success("User Deleted");
   }

    return <div>
        <span className='lg:hidden'>
            <BiMenu className='w-6 h-6 cursor-pointer' />
        </span>

        <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
            <button
                onClick={() => setTab('overview')}
                className={`${tab === 'overview'
                    ? "bg-indigo-100 text-primaryColor"
                    : 'bg-transparent text-headingColor'
                    }
                    w-full btn  mt-0 rounded-md`}>
                Overview
            </button>
            <button
                onClick={() => setTab('appointments')}
                className={`${tab === 'appointments'
                    ? "bg-indigo-100 text-primaryColor"
                    : 'bg-transparent text-headingColor'
                    }
                    w-full btn  mt-0 rounded-md`}>
                Appointments
            </button>
            <button
                onClick={() => setTab('settings')}
                className={`${tab === 'settings'
                    ? "bg-indigo-100 text-primaryColor"
                    : 'bg-transparent text-headingColor'
                    }
                     w-full btn  mt-0 rounded-md`}>
                Profile
            </button>

            <div className="mt-[100px] w-full">
                <button 
                onClick={handleLogout} 
                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">
                    Logout
                </button>
                <button 
                    onClick={handleDelete}
                    className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                    Delete account
                </button>
            </div>
        </div>
    </div>
}

export default Tabs
