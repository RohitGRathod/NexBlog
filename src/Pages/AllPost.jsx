import React, { useEffect, useState } from 'react'
import authservice from '../Appwrite/databaseAndStorage'
import { PostCard } from '../Component'
import { Link } from 'react-router-dom'

function AllPost() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    authservice.getPosts()
      .then((response) => {
        if (response)
          setPosts(response.documents)

      })
  }, [])


  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="text-center px-4">
          <h1 className="text-2xl text-gray-500">
            There are no posts to show <br />
            <Link to="/addpost" className="text-blue-500 hover:underline">
              Click to add a post
            </Link>
          </h1>
        </div>
      </div>

    )
  }
  return (
    <div className="py-8 w-full min-h-screen bg-gray-100 ">
      <div className="max-w-7xl mx-auto flex gap-4">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        
      </div>
    </div>

  )
}

export default AllPost
