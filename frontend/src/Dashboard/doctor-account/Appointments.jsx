import React from 'react'
import { formateDate } from '../../utils/formateDate'

const Appointments = ({ appointments }) => {
  return <div className=''>
    {
    appointments.length === 0 ? (<div className=' text-primaryColor'>No Appointments yet!</div>) : (  
      
    <table className='w-full  tex-sm text-gray-500'>
    <thread className='text-xs p-4 text-gray-700 uppercase bg-gray-100 '>
      <tr className=''>
        <th scope='col' className='px-6 py-3'>Name</th>
        <th scope='col' className='px-6 py-3'>Gender</th>
        <th scope='col' className='px-6 py-3'>Payment</th>
        <th scope='col' className='px-6 py-3'>Price</th>
        <th scope='col' className='px-6 py-3'>Booked On</th>
      </tr>
    </thread>
    <tbody>
      {appointments?.map(item => (
        <tr key={item._id}>
          <td scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
            <img src={item.user.photo} className='w-8 h-8 rounded-full ' alt='' />
            <div className='pl-3'>
              <p className='text-base font-semibold'>{item.user.name}</p>
              <p className='text-nomal text-gray-500' >{item.user.email}</p>
            </div>
          </td>

          <td className='px-6 py-4'>{item.user.gender}</td>
          <td className='px-6 py-4'>
            {item.isPaid && (<div className='flex items-center '><div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
              Paid
            </div>)}

            {!item.isPaid && (<div className='flex items-center '><div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
              UnPaid
            </div>)}
          </td>
          <td className='px-6 py-4'>{item.ticektPrice}</td>
          <td className='px-6 py-4'>{formateDate(item.createdAt)}</td>
        </tr>
      ))}
    </tbody>
  </table>)

    }
  </div>

}

export default Appointments