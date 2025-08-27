import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { getColumns } from '../../utils/AttendanceHelper.jsx';
import axios from 'axios';

let globalStatusChange = null; // to hold the function reference

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const fetchAttendance = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/api/attendance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setAttendance(response.data.attendance);
        setFilteredAttendance(response.data.attendance);
      }
    } catch (error) {
      console.error('Error response:', error.response);
      alert(error.response?.data?.error || error.message || 'Something went wrong!');
    }
  };

  useEffect(() => {
    fetchAttendance();
    globalStatusChange = fetchAttendance; // expose globally
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const records = attendance.filter((emp) =>
      emp.employeeId?.userId?.name?.toLowerCase().includes(value)
    );
    setFilteredAttendance(records);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="px-4 py-0.5 w-60 border-none bg-amber-50"
          onChange={handleFilter}
        />
        <p className="text-2xl mt-4">
          Mark Employees For{" "}
          <span className="font-bold underline">
            {new Date().toISOString().split("T")[0]}{" "}
          </span>
        </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="rounded text-white px-2 py-1 bg-teal-600"
        >
          Attendance Report
        </Link>
      </div>

      <div className="mt-5">
        <DataTable columns={getColumns()} data={filteredAttendance} pagination />
      </div>
    </div>
  );
};

export const statusChange = () => {
  if (globalStatusChange) {
    globalStatusChange();
  }
};

export default Attendance;
