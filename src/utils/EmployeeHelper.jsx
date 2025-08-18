
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";


 export const fetchEmployees = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data.employee || []; // ✅ Return departments arrays
    } else {
      return []; // fallback
    }
  } catch (error) {
    console.error('Error response:', error.response);
    alert(error.response?.data?.error || error.message || 'Something went wrong!');
    return []; // ✅ Always return an array
  }
};

export const getColumns = () => [
  {
    name: "S No",
    selector: (row, index) => index + 1,
  },
  {
    name: "Image",
    cell: (row) => (
      <img
        src={`http://localhost:3000/${row?.userId?.profileImage || 'profile-img.png'}`}
        alt="Profile"
        className="w-10 h-10 object-cover rounded-full"
      />

    ),
    ignoreRowClick: true,
    allowOverflow: true,
  },
  {
    name: "Name",
    selector: (row) => row.userId?.name || "N/A",
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row) =>
      row.dob ? new Date(row.dob).toLocaleDateString("en-GB") : "N/A",
  },
  {
    name: "Department",
    selector: (row) => row.department?.dep_name || "N/A",
    sortable: true
  },
  {
    name: "Action",
    cell: (row) => <EmployeeButtons id={row._id} />,
    ignoreRowClick: true,
    allowOverflow: false,
    minWidth: '250px'
  },
];


export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 justify-center">
      <button
        className="bg-teal-500 hover:bg-teal-600 cursor-pointer text-white text-xs px-2 py-1 rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
      >
        View
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer text-xs px-2 py-1 rounded"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
      >
        Edit
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer text-xs px-2 py-1 rounded"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}
      >
        Salary
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white cursor-pointer text-xs px-2 py-1 rounded"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${id}`)}
      >
        Leave
      </button>
    </div>
  );
};