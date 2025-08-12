import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

 const fetchDepartments = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('https://employee-ms-backend-eight.vercel.app/api/department', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.departments || []; // ✅ Return departments arraye
    } else {
      return []; // fallback
    }
  } catch (error) {
    console.error('Error response:', error.response);
    alert(error.response?.data?.error || error.message || 'Something went wrong!');
    return []; // ✅ Always return an array
  }
};

 const getColumns = (onDepartmentDelete) => [
  {
    name: "Serial No",
    selector: (row, index) => index + 1,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable : true
  },
  {
    name: "Action",
    cell: (row) => (
      <DepartmentButtons id={row._id} onDepartmentDelete={onDepartmentDelete} />
    ),
    ignoreRowClick: true,
    allowOverflow: false,
  },
];

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
    const navigate = useNavigate();


    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const confirm = window.confirm("Do you want to delete the department?")
        if (confirm) {
            try {
                const response = await axios.delete(`https://employee-ms-backend-eight.vercel.app/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.success) {
                    onDepartmentDelete(id);
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

    }
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${id}`)}>Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white"
                onClick={() => handleDelete(id)}>Delete</button>
        </div>
    )
}

export {getColumns, fetchDepartments};