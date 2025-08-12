import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/DepartmentHelper';
import { fetchEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSalary = () => {
    const [departments, setDepartments] = useState([]);
    const [employeeList, setEmployeeList] = useState([]); // ✅ Separate employee list
    const [formData, setFormData] = useState({
        department: '',
        employeeId: '',
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: '',
    });

    const navigate = useNavigate();

    // Load departments initially
    useEffect(() => {
        const loadDepartments = async () => {
            const data = await fetchDepartments();
            setDepartments(data);
        };
        loadDepartments();
    }, []);

    // Fetch employees when department is selected
    useEffect(() => {
        if (formData.department) {
            const loadEmployees = async () => {
                const data = await fetchEmployees(formData.department);
                setEmployeeList(data);
            };
            loadEmployees();
        }
    }, [formData.department]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const payload = {
                employeeId: formData.employeeId,
                payDate: formData.payDate,
                salary: formData.basicSalary,   // ✅ map correctly
                allowances: formData.allowances,
                deductions: formData.deductions,
            };

            const response = await axios.post(
                'https://employee-ms-backend-eight.vercel.app/api/salary/add-salary',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                navigate('/admin-dashboard/salary/add-salary');
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
    };


    return (
        <div className='max-w-4xl mx-auto p-8 mt-16 rounded-md shadow-2xl bg-white'>
            <h2 className='text-2xl font-bold mb-6'>Add New Salary</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    {/* Department */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Department</label>
                        <select
                            name='department'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value=''>Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Employee */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Employee</label>
                        <select
                            name='employeeId'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value=''>Select Employee</option>
                            {employeeList.map((emp) => (
                                <option key={emp._id} value={emp._id}>
                                    {emp.employeeId}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Basic Salary */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Basic Salary</label>
                        <input
                            type='number'
                            name='basicSalary'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Allowances */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Allowances</label>
                        <input
                            type='number'
                            name='allowances'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Deductions */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Deductions</label>
                        <input
                            type='number'
                            name='deductions'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Pay Date */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Pay Date</label>
                        <input
                            type='date'
                            name='payDate'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='font-bold py-2 px-4 rounded-md w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white'
                >
                    Add Salary
                </button>
            </form>
        </div>
    );
};

export default AddSalary;
