import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AttendanceReport = () => {
  const [report, setReport] = useState({}); // ✅ start as object
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");

  const fetchReport = async () => {
    const token = localStorage.getItem('token');
    try {
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);

      const response = await axios.get(
        `http://localhost:3000/api/attendance/report?${query.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport(prev => ({ ...prev, ...response.data.groupData }));
        }
      }
    } catch (error) {
      console.error('Error response:', error.response);
      alert(error.response?.data?.error || error.message || 'Something went wrong!');
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleOnLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mt-4">Attendance Report</h2>

      <div className="flex gap-2 mt-4 ml-4">
        <h2 className="text-xl font-semibold">Filter by Date</h2>
        <input
          type="date"
          className="border bg-gray-100"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value)
            setSkip(0)
          }}
        />
      </div>

      {Object.entries(report).map(([date, records], idx) => (
        <div key={idx} className="mt-6">
          <h2 className="text-xl  py-4 ml-4">Date: {date}</h2>
          <div className="overflow-x-auto max-w-4xl mx-auto">
            <table className="w-full border shadow rounded-lg" border="1" cellPadding="8">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th>S No</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((data, i) => (
                  <tr key={i} className="text-center border-t">
                    <td>{i + 1}</td>
                    <td>{data.employeeId}</td>
                    <td>{data.employeeName}</td>
                    <td>{data.departmentName}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-6 max-w-4xl mx-auto">
        <button
          className="px-4 py-2 bg-gray-200 text-lg font-semibold rounded shadow"
          onClick={handleOnLoadMore}
        >
          Load More
        </button>
      </div>

    </div>

  );
};

export default AttendanceReport;
