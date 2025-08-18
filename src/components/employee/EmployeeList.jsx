// Employee Lists

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { getColumns } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';

const EmployeeList = () => {

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/employee', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setEmployees(response.data.employees);
          setFilteredEmployees(response.data.employees);
        }
      } catch (error) {
        console.error('Error response:', error.response);
        alert(error.response?.data?.error || error.message || 'Something went wrong!');
      }
    };

    fetchEmployees();
  }, []);

 const filteredEmployee = (e) => {
  const record = employees.filter((emp) => emp.userId.name.toLowerCase().includes(e.target.value.toLowerCase()))
  setFilteredEmployees(record);
 }

  return (
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input
          type='text'
          placeholder='Search by Employee Name'
          className='px-4 py-0.5 w-60 border-none bg-amber-50'
          onChange={filteredEmployee}
        />
        <Link
          to='/admin-dashboard/add-employee'
          className='rounded text-white px-2 py-1 bg-teal-600'
        >
          Add New Employee
        </Link>
      </div>
      <div className='mt-5'>
          <DataTable
            columns={getColumns()}
            data={filteredEmployees}
            pagination
          />
      </div>

    </div>
  )
}

export default EmployeeList