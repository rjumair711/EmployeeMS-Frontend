import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments } from '../../utils/DepartmentHelper';

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: ''
    });
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loadDepartments = async () => {
            const data = await fetchDepartments();
            setDepartments(data);
        };

        loadDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`https://employee-ms-backend-eight.vercel.app/api/employee/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                console.error('Error response:', error.response);
                alert(error.response?.data?.error || error.message || 'Something went wrong!');
            }
        };

        fetchEmployee();
    }, [id]);

   const handleChange = (e) => {
    const { name, value } = e.target;
    if (!employee) return;

    if (['name', 'email', 'password', 'role'].includes(name)) {
        setEmployee((prev) => ({
            ...prev,
            userId: {
                ...prev.userId,
                [name]: value
            }
        }));
    } else {
        setEmployee((prev) => ({
            ...prev,
            [name]: value
        }));
    }
};

    const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: employee.userId?.name,
    email: employee.userId?.email,
    maritalStatus: employee.maritalStatus,
    designation: employee.designation,
    department: employee.department,
    salary: employee.salary
  };

  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`https://employee-ms-backend-eight.vercel.app/api/employee/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.data.success) {
      navigate('/admin-dashboard/employees');
    }
  } catch (error) {
    console.error('Error response:', error.response);
    alert(error.response?.data?.error || error.message || 'Something went wrong!');
  }
};


    if (!employee) return <div className="text-center mt-10">Loading...</div>;

    return (
        <>
            {departments && employee ? (
                <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Name</label>
                                <input type="text" name='name' value={employee.userId?.name || ''} onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Email</label>
                                <input type="email" name='email' value={employee.userId?.email || ''} onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
                                <select name="maritalStatus" value={employee.maritalStatus || ''} onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                                    <option value="">Select Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Designation</label>
                                <input type="text" name='designation' value={employee.designation || ''} onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                            </div>
                            <div className='col-span-2'>
                                <label className='block text-sm font-medium text-gray-700'>Department</label>
                                <select name="department" value={employee.department || ''} onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                                    <option value="">Select Department</option>
                                    {departments.map(dep => (
                                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>Salary</label>
                                <input type="number" name='salary' value={employee.salary || ''} onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                            </div>
                        </div>
                        <button type='submit'
                            className='font-bold py-2 px-4 rounded-md w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white'>
                            Update Employee
                        </button>
                    </form>
                </div>
            ) : <div>Loading...</div>}
        </>

    );
};

export default EditEmployee;
