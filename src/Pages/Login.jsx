
import React from 'react'
import { LoginForm } from '../Component'

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full flex justify-center items-center" style={{ minHeight: 'calc(100vh - 96px)' }}>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login