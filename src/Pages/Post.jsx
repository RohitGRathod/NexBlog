import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/databaseAndStorage";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    
    useEffect(() => {
        if (id) {
            appwriteService.getPost(id)
            .then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [id, navigate]);
    
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featured_image);
                navigate("/");
            }
        });
    };
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    return post ? (
        <div style={{marginTop:"2rem",width:"100%"}} > 
        <div className="my-8 min-h-screen w-full">
            <div className='w-full max-w-7xl mx-auto px-4'>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFileView(post.featured_image)}
                        alt={post.Title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2 ">
                            <Link to={`/editpost/${post.$id}`}>
                                <button className="mr-3 !bg-green-500 text-black">
                                    Edit
                                </button>
                            </Link>
                            <button onClick={deletePost} className="!bg-red-500 ">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{post.Title}</h1>
                </div>
                <div className="browser-css text-gray-600 mb-4">
                    {parse(post.Content)}
                    </div>
            </div>
        </div>
        </div>
    ) : null;
}