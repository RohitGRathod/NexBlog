import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './App/store.js'
import { createRoutesFromElements, Route, createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { AuthLayout } from './Component'
import AddPost from './Pages/AddPost.jsx'
import AllPost from './Pages/AllPost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import Post from './Pages/Post.jsx'
const route = createBrowserRouter((
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<AuthLayout authenticated={false}><Login /></AuthLayout>} />
      <Route path='signup' element={<AuthLayout authenticated={false}><SignUp /></AuthLayout>} />
      <Route path="addpost" element={<AuthLayout authenticated={true}><AddPost /></AuthLayout>} />
      <Route path='editpost/:id' element={<AuthLayout authenticated={true}><EditPost /></AuthLayout>} />
      <Route path='allposts' element={<AuthLayout authenticated={true}><AllPost /></AuthLayout>} />
      <Route path='post/:id' element={<AuthLayout authenticated={true}><Post /></AuthLayout>} />

    </Route>
  )
))

createRoot(document.getElementById('root')).render(

  <StrictMode>
      <Provider store={store}>
    <RouterProvider router={route}/>

      </Provider>
    
  </StrictMode>,
)
