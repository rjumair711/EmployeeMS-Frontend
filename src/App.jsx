import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import ProtectRoutes from './utils/ProtectRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import EmployeeList from './components/employee/EmployeeList';
import AddEmployee from './components/employee/addEmployee';
import ViewEmployee from './components/employee/ViewEmployee';
import EditEmployee from './components/employee/editEmployee';
import AddSalary from './components/salary/AddSalary';
import ViewSalary from './components/salary/ViewSalary';
import EmpSummary from './components/EmployeeDashboard/EmployeeSummary';
import LeaveList from './components/Leave/LeaveList';
import AddLeave from './components/Leave/AddLeave';
import Setting from './components/EmployeeDashboard/Setting';
import LeaveTable from './components/Leave/LeaveTable';
import ViewLeave from './components/Leave/ViewLeave';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='/admin-dashboard' />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <ProtectRoutes requiredRole={['admin']}>
              <AdminDashboard />
            </ProtectRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />}></Route>
          <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />}></Route>

          <Route path='/admin-dashboard/employees' element={<EmployeeList />}></Route>
          <Route path='/admin-dashboard/add-employee' element={<AddEmployee />}></Route>

          <Route path='/admin-dashboard/employees/:id' element={<ViewEmployee />}></Route>
          <Route path='/admin-dashboard/employees/edit/:id' element={<EditEmployee />}></Route>
          <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/admin-dashboard/salary/add-salary' element={<AddSalary />}></Route>
          
          <Route path='/admin-dashboard/leaves' element={<LeaveTable />}></Route>
          <Route path='/admin-dashboard/leaves/:id' element={<ViewLeave />}></Route>
          <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/admin-dashboard/setting' element={<Setting />}></Route>
          

        </Route>
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <ProtectRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </ProtectRoutes>
          </PrivateRoutes>
        }>

          <Route index element={<EmpSummary />}></Route>
          <Route path='/employee-dashboard/profile/:id' element={<ViewEmployee />}></Route>
          
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>          
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/employee-dashboard/setting' element={<Setting />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
