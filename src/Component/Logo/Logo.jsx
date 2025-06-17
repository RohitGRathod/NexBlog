import React from 'react'
import logo from '/Logo.png'

function Logo() {
  return (
    <div>
      <img src={logo} alt="Logo" className="w-20 h-20 object-cover" />
    </div>
  )
}

export default Logo
