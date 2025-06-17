import React from 'react'
import { SignUpForm } from '../Component'

function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full flex justify-center items-center" style={{ minHeight: 'calc(100vh - 96px)' }}>
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUp
