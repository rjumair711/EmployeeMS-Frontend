import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/DepartmentHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const addEmployee = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const loadDepartments = async () => {
            const data = await fetchDepartments(); // ✅ wait for the data
            setDepartments(data); // ✅ make sure it's an array
        };

        loadDepartments();
    }, [])
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            // Handles file input (like profileImage)
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            // Handles text input
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();

        // Append all text fields
        for (let key in formData) {
            if (key !== 'profileImage') {
                formDataObj.append(key, formData[key]);
            }
        }

        // Append file with exact key name as in multer config
        formDataObj.append('profileImage', formData.profileImage);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://employee-ms-backend-eight.vercel.app/api/employee/add', formDataObj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.success) {
                navigate('/admin-dashboard/employees');
            }
        } catch (error) {
            console.error('Error response:', error.response);
            if (error.response?.data?.error) {
                alert(error.response.data.error);
            } else if (error.message) {
                alert(error.message);
            } else {
                alert('Something went wrong!');
            }

        }

    }

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/*Name*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Name
                        </label>
                        <input type="text" name='name'
                            placeholder='Enter your Name'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Email*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input type="text"
                            onChange={handleChange}
                            name='email' placeholder='Enter your Email'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Emplpyee ID*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Employee ID
                        </label>
                        <input type="text" onChange={handleChange} name='employeeId' placeholder='Employee ID'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Date of Birth*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Date of Birth
                        </label>
                        <input type="date" name='dob' onChange={handleChange} placeholder='DOB'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Gender*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Gender
                        </label>
                        <select name="gender" onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {/*Marital Status*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Marital Status
                        </label>
                        <select name="maritalStatus" onChange={handleChange} placeholder='Marital Status'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>
                    {/*Designation*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Designation
                        </label>
                        <input type="text" name='designation' onChange={handleChange} placeholder='Designation'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Department*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Department
                        </label>
                        <select name="department" onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select Department</option>
                            {departments.map(dep => {
                                return (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                );
                            })}
                        </select>

                    </div>
                    {/*Salary*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Salary
                        </label>
                        <input type="number" onChange={handleChange} name='salary' placeholder='Salary'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Password*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Password
                        </label>
                        <input type="password" onChange={handleChange} name='password' placeholder='*******'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    {/*Role*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Role
                        </label>
                        <select name="role" onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    {/* Image Upload */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Upload Image
                        </label>
                        <input type="file" name='profileImage' onChange={handleChange} placeholder='Upload Image' accept='image/*'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                    </div>
                </div>
                <button type='submit'
                    className='font-bold py-2 px-4 rounded-md w-full mt-6  bg-teal-600 hover:bg-teal-700 text-white'>
                    Add Employee
                </button>
            </form>
        </div>
    )
}

export default addEmployee