import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://employee-ms-backend-eight.vercel.app/api/department/add', department, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                navigate('/admin-dashboard/departments');
            }
        
        } catch (error) {
            console.error("Error response:", error.response); // <-- Add this line
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else if (error.message) {
                alert(error.message); // shows the actual error message
            } else {
                alert("Something went wrong!");
            }
        }

    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-2xl w-96">
            <h2 className="text-2xl font-bold mb-6">Add New Department</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">
                        Department Name
                    </label>
                    <input
                        type="text"
                        id="dep_name"
                        name="dep_name"
                        value={department.dep_name}
                        onChange={handleChange}
                        placeholder="Enter Department Name"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={department.description}
                        onChange={handleChange}
                        className="block mt-1 p-2 w-full border border-gray-300 rounded-md"
                        rows="4"
                        placeholder="Description"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 py-2 px-4 rounded-md hover:bg-teal-700 text-white font-bold"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;
