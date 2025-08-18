import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            const token = localStorage.getItem('token');
            try {
                setIsLoading(true); // Start loading
                const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) {
                    setEmployee(response.data.employee);
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
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchEmployee();
    }, [id]);

    if (isLoading) {
        return <p className='text-center mt-10 text-lg font-medium'>Loading employee details...</p>;
    }

    return (
        <>
        {employee ? (
<div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-2xl'>
            <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <img
                        src={`http://localhost:3000/${employee?.userId?.profileImage || 'profile-img.png'}`}
                        className='rounded-full w-72'
                        alt="Profile"
                    />
                </div>
                <div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Name:</p>
                        <p className='font-medium mt-0.5'>{employee?.userId?.name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Employee ID:</p>
                        <p className='font-medium mt-0.5'>{employee?.employeeId}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Date of Birth:</p>
                        <p className='font-medium mt-0.5'>
                            {employee?.dob ? new Date(employee.dob).toLocaleDateString() : ''}
                        </p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Gender:</p>
                        <p className='font-medium mt-0.5'>{employee?.gender}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Department:</p>
                        <p className='font-medium mt-0.5'>{employee?.department.dep_name}</p>
                    </div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Marital Status:</p>
                        <p className='font-medium mt-0.5'>{employee?.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
        ): <div>Loading ...</div>}
        </>
        
    );
};

export default ViewEmployee;
