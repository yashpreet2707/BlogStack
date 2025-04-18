import React, { useState } from 'react'
import { TextInput, Select, FileInput, Button, Alert } from "flowbite-react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {

    const navigate = useNavigate();

    const [file, setFile] = useState(null)
    const [imgLoading, setImgLoading] = useState(false)
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null)

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
        console.log("handle submit called.")
        try {
            const result = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await result.json();
            if (!result.ok) {
                setPublishError(data.message)
            } else {
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            setPublishError("Something went wrong.")
        }
    }

    console.log(publishError)

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput onChange={(e) => setFormData({ ...formData, title: e.target.value })} className='flex-1' id='title' placeholder='Title' type='text' required />
                    <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })} >
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
                <ReactQuill onChange={(value) => setFormData({ ...formData, content: value })} required className='h-72 mb-12' theme='snow' placeholder='Write something...' />
                <Button type='submit' className='bg-gradient-to-r from-purple-600 to-indigo-600 whitespace-nowrap' disabled={publishError || imgLoading} >Publish</Button>
                {
                    publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
                }
            </form>
        </div>
    )
}

export default CreatePost