import axios from "axios";
import React from "react";
import { statusChange } from "../components/attendance/Attendance";

export const getColumns = () => [
  {
    name: "S No",
    selector: (row, index) => index + 1,
  },
  {
    name: "Name",
    selector: (row) => row.employeeId?.userId?.name || "N/A",
    sortable: true,
  },
  {
    name: "EMP ID",
    selector: (row) => row.employeeId?.employeeId || "N/A",
  },
  {
    name: "Department",
    selector: (row) => row.employeeId?.department?.dep_name || "N/A",
    sortable: true
  },
  {
    name: "Action",
    cell: (row) => <AttendanceHelper status={row.status} employeeId={row.employeeId?.employeeId} statusChange={statusChange} />,
    ignoreRowClick: true,
    allowOverflow: false,
    width: "300px",
  },
];

const AttendanceHelper = ({ status, employeeId, statusChange }) => {

  const markEmployee = async (status, employeeId) => {
     const token = localStorage.getItem('token');
    
     const response = await axios.put(`http://localhost:3000/api/attendance/update/${employeeId}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.success) {
      statusChange();
    }
  }


  return (
    <div>
      {status == null ? (
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-green-500 text-white whitespace-nowrap"
            onClick={() => markEmployee("present", employeeId)}>Present</button>

          <button className="px-3 py-1 bg-red-500 text-white whitespace-nowrap"
            onClick={() => markEmployee("absent", employeeId)}>Absent</button>

          <button className="px-3 py-1 bg-gray-500 text-white whitespace-nowrap"
            onClick={() => markEmployee("sick", employeeId)}>Sick</button>

          <button className="px-3 py-1 bg-yellow-500 text-white whitespace-nowrap"
            onClick={() => markEmployee("leave", employeeId)}>Leave</button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center py-1 rounded">{status}</p>
      )}
    </div>
  )
}

export default AttendanceHelper
