import React, { useState } from 'react'
import { TextInput, Select, FileInput, Button } from "flowbite-react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const CreatePost = () => {
    const [value, setValue] = useState("");

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
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput type='file' accept='image/*' />
                    <Button type='button' className='bg-gradient-to-r from-purple-600 to-indigo-600 whitespace-nowrap' >Upload Image</Button>
                </div>
                <ReactQuill required className='h-72 mb-12' theme='snow' value={value} onchange={(e) => setValue(e.target.value)} placeholder='Write something...' />
                <Button type='button' className='bg-gradient-to-r from-purple-600 to-indigo-600 whitespace-nowrap' >Publish</Button>
            </form>
        </div>
    )
}

export default CreatePost