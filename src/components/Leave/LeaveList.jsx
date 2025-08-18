import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const { id } = useParams();

  useEffect(() => {
  if (!user?._id) return; // wait until user is loaded

  const fetchLeaves = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && Array.isArray(response.data.leaves)) {
        setLeaves(response.data.leaves);
      } else {
        setLeaves([]); // fallback to empty array
      }
    } catch (error) {
      console.error('Error response:', error.response);
      alert(error.response?.data?.error || error.message || 'Something went wrong!');
    }
  };

  fetchLeaves();
}, [user]);

  return (
    <>
      <div className='overflow-x-auto p-5'>
        <div className='p-6'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
          </div>
          <div className='flex justify-between items-center'>
            <input type="text" className='px-4 py-0.5 bg-amber-50' placeholder='Search By Dep Name' />
            {user.role === 'employee' && (
                <Link to="/employee-dashboard/add-leave" 
                className='px-4 py-1 bg-teal-600 text-white font-bold rounded'>Add New Leave</Link>              
            )}
          </div>

          <table className='w-full text-sm text-left text-gray-500 mt-5'>
            <thead className='text-sm text-gray-700 uppercase bg-gray-50 border border-gray-200'>
              <tr>
                <th className='px-6 py-3'>S NO</th>
                <th className='px-6 py-3'>LEAVE TYPE</th>
                <th className='px-6 py-3'>FROM</th>
                <th className='px-6 py-3'>TO</th>
                <th className='px-6 py-3'>DESCRIPTION</th>
                <th className='px-6 py-3'>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr key={leave._id} className='bg-white text-gray-500 border-b'>
                  <td className='px-6 py-3'>{index + 1}</td>
                  <td className='px-6 py-3'>{leave.leaveType}</td>
                  <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className='px-6 py-3'>{leave.reason}</td>
                  <td className='px-6 py-3'>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LeaveList;
