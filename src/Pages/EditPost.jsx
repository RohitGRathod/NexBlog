import PostForm from "../Post_form/PostForm";
import  { useEffect, useState } from 'react'
import authservice from '../Appwrite/databaseAndStorage'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function EditPost() {
    const [post,setPost] = useState(null)
    const navigate = useNavigate();
    const {id} = useParams()
    console.log(id)
   
    useEffect(() => { 
      if(id){
        authservice.getPost(id)
        .then((response) => {
          if(response){
            setPost(response)
          }
        })
      }else{
        navigate('/')
      }
    }, [id, navigate])
    
   
  return post ?  (
    <div className="py-8">
      <PostForm post={post}/>
      <p>hello</p>
    </div>
  ):null
}

export default EditPost
