import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import RTE from '../RTE';
import authservice from '../Appwrite/databaseAndStorage'
import { useSelector } from 'react-redux';
import Input from '../Component/Input';
import { useCallback } from 'react';


function PostForm({ post }) {
  const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.Title || "",
      slug: post?.$id || "",
      content: post?.Content || "",
      status: post?.Status || "active",
    }
  },);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      let id = post.featured_image
      const file = await authservice.uploadFile(data.image[0]);
      if (file) {
        authservice.deleteFile(post.featured_image);
        id = file.$id
      }
      const dbPost = await authservice.updatePost(post.$id, { ...data, featuredImage: id, userId: userData.$id });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
    else {
      const file = await authservice.uploadFile(data.image[0]);
      if (file) {
        const dbPost = await authservice.createPost({ ...data, featuredImage: file.$id, userId: userData.$id });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")      // Remove special chars
      .replace(/\s+/g, "-")              // Replace spaces with -
      .replace(/-+/g, "-");              // Replace multiple - with single -
  }, []);

 
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {

        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue])
  return (
    <div className=" min-h-screen mx-auto p-4 bg-white shadow-md rounded-lg flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap ">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className='w-full m-3 flex flex-wrap justify-center items-center' >
            <p className='text-gray-800 w-full'>Previous Image:</p>
            <div className="w-1/2 mb-4">
              <img
                src={authservice.getFileView(post.featured_image)}
                alt={post.Title}
                className="rounded-lg"
              />
            </div>
            </div>
          )}
          <label htmlFor="status" className='mb-4 text-gray-900'>Status:</label>
          <select id="status" className='w-full text-gray-900  border border-gray-300 bg-white rounded' {...register("status", { required: true })}>
            <option value="active" default>Active</option>
            <option value="inactive">InActive</option>
          </select>


          <button type="submit" className={`w-full ${post ? "bg-green-500" : ""} pt-4`} style={{ marginTop: "1rem" }}>
            {post ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>

  );
}

export default PostForm
