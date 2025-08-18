import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewLeave = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            const token = localStorage.getItem('token');
            try {
                setIsLoading(true); // Start loading
                const response = await axios.get(`http://localhost:3000/api/leave/detail/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) {
                    setLeave(response.data.leave);
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

        fetchLeave();
    }, [id]);

    const changeStatus = async (id, status) => {
        const token = localStorage.getItem('token');

        try {
            setIsLoading(true); // Start loading
            const response = await axios.put(`http://localhost:3000/api/leave/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
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
    }

    return (
        <>
            {leave ? (
                <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-2xl'>
                    <h2 className='text-2xl font-bold mb-8 text-center'>Leave Details</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <img
                                src={`http://localhost:3000/${leave.employeeId?.userId?.profileImage || 'profile-img.png'}`}
                                className='rounded-full w-72'
                                alt="Profile"
                            />
                        </div>
                        <div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Name:</p>
                                <p className='font-medium mt-0.5'>{leave.employeeId?.userId?.name}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Employee ID:</p>
                                <p className='font-medium mt-0.5'>{leave.employeeId?.employeeId}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Leave Type:</p>
                                <p className='font-medium mt-0.5'>
                                    {leave.leaveType}
                                </p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Reason:</p>
                                <p className='font-medium mt-0.5'>{leave.reason}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Department:</p>
                                <p className='font-medium mt-0.5'>{leave.employeeId?.department.dep_name}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>Start Date:</p>
                                <p className='font-medium mt-0.5'>{new Date(leave.startDate).toLocaleDateString()}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>End Date:</p>
                                <p className='font-medium mt-0.5'>{new Date(leave.endDate).toLocaleDateString()}</p>
                            </div>
                            <div className='flex space-x-3 mb-2'>
                                <p className='text-lg font-bold'>
                                    {leave.status === "Pending" ? "Action:" : "Status:"}
                                </p>
                                {leave.status === "Pending" ? (
                                    <div className='flex space-x-2 cursor-pointer'>
                                        <button
                                            onClick={() => changeStatus(leave._id, "Approved")}
                                            className='px-2 py-0.5 hover:bg-teal-400 bg-teal-300 cursor-pointer'>Approve</button>
                                        <button
                                            onClick={() => changeStatus(leave._id, "Rejected")}
                                            className='px-2 py-0.5 hover:bg-red-400 bg-red-300 cursor-pointer'>Reject</button>
                                    </div>
                                ) :
                                    <p className='font-medium mt-0.5'>{leave.status}</p>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            ) : <div>Loading ...</div>}
        </>

    );
};

export default ViewLeave;
