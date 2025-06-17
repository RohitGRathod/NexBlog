import React from 'react'
import authservice from '../Appwrite/databaseAndStorage'
import { PostCard } from '../Component'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Home() {
    const [posts, setPosts] = React.useState([])
    const authstatus = useSelector((state) => state.auth.status);
    React.useEffect(() => {
        // Fetch posts when the component mounts
        authstatus && authservice.getPosts()
            .then((response) => {
                if (response) {
                    setPosts(response.documents)
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error)
            })
    }, []) // Empty dependency array to run only once on mount


    if (!authstatus) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full">
                        <Link to="/login" className="text-blue-500 hover:underline">
                            <b>Login to read posts</b>
                        </Link>  
                    
               
            </div>
        )
    }
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
        <div className='w-full py-8 min-h-screen bg-gray-100'>

            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home
