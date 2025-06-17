import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../Appwrite/databaseAndStorage'


function PostCard({$id,Title,featured_image}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 border border-gray-300 hover:shadow-lg transition-shadow duration-200 ' style={{margin:"1rem"}}>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFileView(featured_image)} alt={Title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{Title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
