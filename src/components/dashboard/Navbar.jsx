import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
  const {user, logout} = useAuth();

    return (
    <div className='flex text-white items-center justify-between h-12 bg-teal-600 px-5'>
        <p className=''>Welcome {user.name}</p>
        <button onClick={logout} className='px-4 py-1 bg-teal-700 hover:bg-teal-800 cursor-pointer rounded-4xl'>Logout</button>
    </div>
  )
}

export default Navbar