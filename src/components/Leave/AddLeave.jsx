import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeave = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [leave, setLeave] = useState({
        userId: user._id,
        leaveType: "Sick Leave",
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            setIsLoading(true); // Start loading
            const response = await axios.post(`http://localhost:3000/api/leave/add-leave`, leave, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                navigate("/employee-dashboard")
            }
        } catch (error) {
            if (error.response && error.response.data?.error) {
                alert(`Error: ${error.response.data.error}`);
            } else if (error.message) {
                alert(`Error: ${error.message}`);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false); // Stop loading
        }

    }

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-2xl'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold mb-6'>Request for Leave</h2>
            </div>

            {/* Leave Form */}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-4'>

                    {/* Leave Type Selection */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Leave Type
                        </label>
                        <select
                            name="leaveType"
                            onChange={handleChange}
                            className='mt-1 p-2 block border w-full border-gray-300 rounded-md'
                            required
                        >
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>

                    {/* Date Range Inputs */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Start Date */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>From Date</label>
                            <input
                                type="date"
                                name='startDate'
                                onChange={handleChange}
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>To Date</label>
                            <input
                                type="date"
                                name='endDate'
                                onChange={handleChange}
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            />
                        </div>
                    </div>

                    {/* Leave Description / Reason */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Description</label>
                        <textarea
                            name="reason"
                            placeholder='Reason'
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded-md p-2'
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                >
                    Submit Leave Request
                </button>
            </form>
        </div>
    );
};

export default AddLeave;
