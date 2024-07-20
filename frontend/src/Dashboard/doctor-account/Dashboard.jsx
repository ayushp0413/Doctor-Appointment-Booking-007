import React, { useState } from 'react'
import Loader from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import Tabs from './Tabs'
import starIcon from '../../assets/images/Star.png'
import DoctorAbout from '../../pages/Doctors/DoctorAbout.jsx'
import Profile from './Profile.jsx'
import Appointments from './Appointments.jsx'
import { IoMdInformationCircleOutline } from "react-icons/io";

const Dashboard = () => {

    const { data, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

    console.log("DTA DTA: ", data);
    const [tab, setTab] = useState('overview')

    return <section>

        <div className='max-w-[1170px] px-5 mx-auto'>
            {loading && !error && <Loader />}
            {error && !loading && <Error />}

            {
                !loading && !error && (
                    <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
                        <Tabs tab={tab} setTab={setTab} userData={data} />
                        <div className='lg:col-span-2'>
                            {data.isApproved === 'pending' && (
                                <div className='flex  items-center p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                                    <IoMdInformationCircleOutline size={22}/>
                                    <div className='ml-3 text-sm font-medium'>
                                        To get approval please complete your profile. We'll review manually and approve with 3 days.
                                    </div>
                                </div>
                            )}

                            <div className='mt-8'>  
                                {tab === "overview" && <div>
                                    <div className='flex items-center gap-4 mb-10'>
                                        <figure className='max-w-[200px] max-h-[200px] w-[180px]'>
                                            <img src={data?.photo} alt="" className='w-full' />
                                        </figure>
                                        <div>
                                            <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                                                {data?.specialization?.charAt(0).toUpperCase() + data?.specialization?.slice(1) || "Add Specialization"} 
                                            </span>
                                            <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3'>{data.name}</h3>

                                            <div className='flex items-center gap-[6px]'>
                                                <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                                                    <img src={starIcon} alt="" /> {data.averageRating?.toFixed(1)}
                                                </span>
                                                <span className='text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                                                    ({data.totalRating})
                                                </span>
                                            </div>

                                            <p className='text_para font-[15px] lg:max-w-[390px] leading-6'>
                                                {data?.bio || "Add About..."}
                                            </p>
                                        </div>
                                    </div>
                                    <DoctorAbout
                                        name={data.name}
                                        about={data.about}
                                        qualification={data.qualifications}
                                        experiences={data.experiences} />
                                </div>}
                                {tab === "appointments" && <Appointments appointments={data?.appointments} /> }
                                {tab === "settings" && <Profile doctorData={data}/>}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </section>
}

export default Dashboard