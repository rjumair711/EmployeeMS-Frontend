import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        const response = await axios.put("http://localhost:3000/api/setting/change-password", setting, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setError(""); // clear error
          navigate("/admin-dashboard");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    }
  }

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='text-sm font-medium text-gray-700'>Old Password</label>
          <input
            type="password"
            name='oldPassword'
            placeholder='Old Password'
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='text-sm font-medium text-gray-700'>New Password</label>
          <input
            type="password"
            name='newPassword'
            placeholder='New Password'
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='text-sm font-medium text-gray-700'>Confirm Password</label>
          <input
            type="password"
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <button
          type="submit"
          className='py-2 px-4 rounded-md w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold'
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
