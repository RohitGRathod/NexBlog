import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { login, logout } from './App/Service'
import { Header } from './Component'
import { Footer } from './Component'
import authService from './Appwrite/auth'
import { useSelector } from 'react-redux'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
      authService.getAccount()
        .then((userData) => {
          if (userData) {
           
            dispatch(login(userData))
          } else {
            dispatch(logout())
          }
        })
        .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className='w-full block'>
        <Header className="w-full shadow-md bg-white z-10" />
        <main className="flex-1 w-full">
          <Outlet className="h-full" />
        </main>
        <Footer className="w-full bg-gray-800 text-white text-center py-4" />
      </div>
    </div>
  ) : <div className='text-white'>
    <b>...Loading <br />Please wait</b></div>
}

export default App
