import React from 'react'
import { useDispatch } from 'react-redux'
import { logout as LogOut } from '../../App/Service'
import authservice from '../../Appwrite/auth'
import { useNavigate } from 'react-router-dom'

function Logoutbtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    authservice.logout()
    dispatch(LogOut())
    navigate('/login')

  }
  return (
    <button onClick={handleLogout} className='inline-bock px-6 py-2 duration-200 !bg-red-500 rounded-full'>Logout</button>
  )
}

export default Logoutbtn
