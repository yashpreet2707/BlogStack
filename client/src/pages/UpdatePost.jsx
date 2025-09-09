import React, { useEffect, useState } from 'react'
import { TextInput, Select, FileInput, Button, Alert } from "flowbite-react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePost = () => {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL


    const navigate = useNavigate();
    const { postId } = useParams();
    const { currentUser } = useSelector((state) => state.user);

    const [file, setFile] = useState(null)
    const [imgLoading, setImgLoading] = useState(false)
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null)



    useEffect(() => {
        try {
            const fetchPost = async () => {
                const result = await fetch(`${BASE_URL}/api/post/getposts?postId=${postId}`);
                const data = await result.json();

                if (!result.ok) {
                    setPublishError(data.message)
                    return;
                } else {
                    setPublishError(null)
                    setFormData(data.posts[0])
                }
            };
            fetchPost()
        } catch (error) {
            console.log(error)
        }
    }, [postId])

    const handleUploadImage = async () => {
        try {
            if (!file) {
                return;
            }
            setImgLoading(true);
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "BlogStack");
            data.append("cloud_name", "dhr2ijbmb");

            const res = await fetch("https://api.cloudinary.com/v1_1/dhr2ijbmb/image/upload", {
                method: "PUT",
                body: data,
            })

            const uploadedImageURL = await res.json();
            setImgLoading(false);
            setFormData({ ...formData, image: uploadedImageURL.url })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await fetch(`${BASE_URL}/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: "include",
            })
            const data = await result.json();
            if (!result.ok) {
                console.log(data.message)
                setPublishError(data.message)
            } else {
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            setPublishError("Something went wrong.")
        }
    }


    if (!formData.title) {
        return <div className='flex justify-center items-center h-screen'>
            <h1>Loading...</h1>
        </div>
    }

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData?.title} className='flex-1' id='title' placeholder='Title' type='text' required />
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} >
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-purple-600 border-dotted p-3'>
                    <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                    <Button onClick={handleUploadImage} type='button' className='bg-gradient-to-r from-purple-600 to-indigo-600 whitespace-nowrap' disabled={imgLoading}>{imgLoading ? "Uploading..." : "Upload Image"}</Button>
                </div>
                {formData.image && (
                    <img src={formData.image} alt="upload" className='w-full h-72 object-cover' />
                )}
                <ReactQuill value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} required className='h-72 mb-12' theme='snow' placeholder='Write something...' />
                <Button type='submit' className='bg-gradient-to-r from-purple-600 to-indigo-600 whitespace-nowrap' disabled={publishError || imgLoading} >Update Post</Button>
                {
                    publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
                }
            </form>
        </div>
    )
}

export default UpdatePost