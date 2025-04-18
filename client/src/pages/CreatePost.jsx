import React, { useState } from 'react'
import { TextInput, Select, FileInput, Button, Alert } from "flowbite-react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const CreatePost = () => {
    const [file, setFile] = useState(null)
    const [imgLoading, setImgLoading] = useState(false)
    const [formData, setFormData] = useState({});

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


    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
            <form className='flex flex-col gap-4' action="">
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput className='flex-1' id='title' placeholder='Title' type='text' required />
                    <Select>
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
                <ReactQuill required className='h-72 mb-12' theme='snow' placeholder='Write something...' />
                <Button type='button' className='bg-gradient-to-r from-purple-600 to-indigo-600 whitespace-nowrap' disabled={imgLoading} >Publish</Button>
            </form>
        </div>
    )
}

export default CreatePost