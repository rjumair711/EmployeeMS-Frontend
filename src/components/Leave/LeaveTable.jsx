import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { LeaveColumn } from '../../utils/LeaveHelper';
import axios from 'axios';

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);


  const fetchLeaves = async (req, res) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://employee-ms-backend-eight.vercel.app/api/leave', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.success) {
        setLeaves(response.data.leaves);
        setFilteredLeaves(response.data.leaves);
      }
    } catch (error) {
      console.error('Error response:', error.response);
      return res.status(500).json({ error: error.message || 'Internal server error.' });

    }
  }

  useEffect(() => {
    fetchLeaves()
  }, [])

  const filterLeaves = (e) => {
    const data = leaves.filter(leave =>
      leave?.employeeId?.employeeId?.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredLeaves(data);
  }

  const filterByButton = (status) => {
    const data = leaves.filter(leave => leave.status
      .toLowerCase()
      .includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  }


  return (
    <>
      {filteredLeaves ? (
        <div className='p-6'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
          </div>
          <div className='flex justify-between items-center'>
            <input type="text"
              className='px-4 py-0.5 bg-amber-50'
              placeholder='Search By Emp ID'
              onChange={filterLeaves} />
            <div className='space-x-3'>

              <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick={() => filterByButton("Pending")}
              >Pending</button>
              <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick={() => filterByButton("Approved")}
              >Approved</button>
              <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick={() => filterByButton("Rejected")}
              >Rejected</button>
            </div>
          </div>
          <DataTable className='mt-6' columns={LeaveColumn()} data={filteredLeaves} pagination />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default LeaveTable