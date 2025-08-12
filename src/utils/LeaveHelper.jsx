import { useNavigate } from "react-router-dom";
import React from "react";

export const LeaveColumn = () => [
  {
    name: "S NO",
    selector: (row, index) => index + 1,
    width: "70px",
  },
  {
    name: "NAME",
    selector: (row) => row?.employeeId?.userId?.name || "N/A",
    width: "140px",
  },
  {
    name: "EMP ID",
    selector: (row) => row?.employeeId?.employeeId || "N/A",
    width: "120px",
  },
  {
    name: "DEPARTMENT",
    selector: (row) => row?.employeeId?.department?.dep_name || "N/A",
    sortable: true,
    width: "170px",
  },
  {
    name: "DAYS",
    selector: (row) => {
      const start = new Date(row.startDate);
      const end = new Date(row.endDate);
      const diffInMs = end - start;
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) + 1; // +1 to include the end date
      return diffInDays || "N/A";
    },
    width: "80px",
  },
  {
    name: "LEAVE TYPE",
    selector: (row) => row?.leaveType || "N/A",
    width: "140px",
  },
  {
    name: "STATUS",
    selector: (row) => row?.status || "N/A",
    width: "120px",
  },
  {
    name: "ACTION",
    cell: (row) => <LeaveButtons Id={row._id} />,
    center: true,
  },
];



export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`)
  };
  return (
    <button onClick={() => handleView(Id)}
      className="px-4 py-1 bg-teal-500 hover:bg-teal-600 rounded text-white">View
    </button>
  )
}