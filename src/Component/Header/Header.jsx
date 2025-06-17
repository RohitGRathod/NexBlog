import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logoutbtn from './Logoutbtn';
import { Link } from 'react-router-dom'
import Logo  from '../Logo/Logo';

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const navItem = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/allposts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/addpost",
      active: authStatus,
    },
  ]
  const handleNavigation = (slug) => () => {
    navigate(slug);
  }
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center px-4 py-3 gap-4">
        <Link to="/" className="flex items-center mr-3">
          <Logo width="50px" />
        </Link>

        <ul className="flex items-center gap-5 ">
          {navItem.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={handleNavigation(item.slug)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {authStatus && (
            <li>
              <Logoutbtn />
            </li>
          )}
        </ul>
      </nav>
    </header>





  )
}

export default Header
