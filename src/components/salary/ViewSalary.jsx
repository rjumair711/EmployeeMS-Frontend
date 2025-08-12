// Employee Lists

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const ViewSalary = () => {

    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchSalaries = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`https://employee-ms-backend-eight.vercel.app/api/salary/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setSalaries(response.data.salary);
                    setFilteredSalaries(response.data.salary);
                }
            } catch (error) {
                console.error('Error response:', error.response);
                alert(error.response?.data?.error || error.message || 'Something went wrong!');
            }
        };

        fetchSalaries();
    }, []);

    const filteredSalary = (e) => {
        const record = salaries.filter((leave) => leave.employeeId.toLocaleLowerCase().includes(e.toLocaleLowerCase()))
        setFilteredSalaries(record);
    }

    return (
        <>
            <div className='overflow-x-auto p-5'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Salary History</h3>
                </div>
                <div className='flex justify-end my-3'>
                    <input
                        type='text'
                        placeholder='Search by Employee ID'
                        className='px-4 py-0.5 w-60 border-none rounded-md bg-amber-50'
                        onChange={filteredSalary}
                    />
                </div>
                {filteredSalaries.length > 0 ? (
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-sm text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                            <tr>
                                <th className='px-6 py-3'>S NO</th>
                                <th className='px-6 py-3'>Emp ID</th>
                                <th className='px-6 py-3'>Salary</th>
                                <th className='px-6 py-3'>Allowance</th>
                                <th className='px-6 py-3'>Deduction</th>
                                <th className='px-6 py-3'>Total</th>
                                <th className='px-6 py-3'>Pay Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalaries.map((salary, index) => (
                                <tr key={salary._id} className='bg-white text-gray-500 border-b'>
                                    <td className='px-6 py-3'>{index + 1}</td>
                                    <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
                                    <td className='px-6 py-3'>{salary.salary}</td>
                                    <td className='px-6 py-3'>{salary.allowances}</td>
                                    <td className='px-6 py-3'>{salary.deductions}</td>
                                    <td className='px-6 py-3'>{salary.netSalary}</td>
                                    <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<div className='text-center text-2xl'>No Records</div>)}
            </div>
        </>
    )
}

export default ViewSalary;