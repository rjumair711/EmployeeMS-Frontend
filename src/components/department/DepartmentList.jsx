import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { getColumns } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = (id) => {
    const updated = departments.filter(dep => dep._id !== id);
    setDepartments(updated);
    setFilteredDepartments(updated);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setDepartments(response.data.departments);
          setFilteredDepartments(response.data.departments);
        }
      } catch (error) {
        console.error('Error response:', error.response);
        alert(error.response?.data?.error || error.message || 'Something went wrong!');
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records);
  }
  return (
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input
          type='text'
          placeholder='Search by Department Name'
          className='px-4 py-0.5 w-60 border-none bg-amber-50'
          onChange={filterDepartments}
        />
        <Link
          to='/admin-dashboard/add-department'
          className='rounded text-white px-2 py-1 bg-teal-600'
        >
          Add New Department
        </Link>
      </div>
      <div className='mt-5'>
        <DataTable columns={getColumns(onDepartmentDelete)} data={filteredDepartments} pagination />
      </div>
    </div>
  );
};

export default DepartmentList;
