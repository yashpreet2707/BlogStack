import { Alert, Button, FileInput, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import {uploadFile} from "../azure.js"
import { updateStart, updateSuccess, updateFailure, } from '../redux/user/userSlice';

const DashProfile = () => {

    const dispatch = useDispatch();

    const { currentUser } = useSelector(state => state.user);

    const [imageFileURL, setImageFileURL] = useState(null);
    const [finalLink, setFinalLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({})
    const [userUpdateSuccess, setUserUpdateSuccess] = useState(null)

    const filePickerRef = useRef();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return
        if (file) {
            setImageFileURL(URL.createObjectURL(file))
        }
        setLoading(true);

        try {
            const data = new FormData();
            data.append("file", file)
            data.append("upload_preset", "BlogStack")
            data.append("cloud_name", "dhr2ijbmb")

            const res = await fetch("https://api.cloudinary.com/v1_1/dhr2ijbmb/image/upload", {
                method: 'PUT',
                body: data,
            })

            const uploadedImageURL = await res.json();
            setFinalLink(uploadedImageURL.url);
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    useEffect(() => {
        setFormData({ ...formData, profilePicture: finalLink });
    }, [finalLink])

    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            return;
        }
        try {
            dispatch(updateStart());
            const result = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await result.json();

            if (!result.ok) {
                dispatch(updateFailure(data.message))
            } else {
                dispatch(updateSuccess(data))
                setUserUpdateSuccess("User's profile updated successfully!")
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
        }
    }

    return (
        <div className='h-full'>
            <h1 className='pt-7 mb-5 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <FileInput className='hidden w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto mt-5' type="file" accept='image/*' onChange={handleImageUpload} ref={filePickerRef} />
                <div className='w-32 h-32 self-center my-2' onClick={() => filePickerRef.current.click()}>
                    <img src={imageFileURL || currentUser.profilePicture} alt="user-img" className='rounded-full w-full h-full border-8 border-[lightgray] object-cover' />
                    {loading && <div className='ml-6'>Loading...</div>}
                </div>
                <div className='w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto flex flex-col gap-4'>
                    <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser?.username} onChange={handleChange} />
                    <TextInput type='email' id='email' placeholder='username' defaultValue={currentUser?.email} onChange={handleChange} />
                    <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
                    <Button type='submit' className='bg-gradient-to-r from-purple-600 to-indigo-600'>Update</Button>
                </div>
            </form>
            <div className='w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto text-red-500 flex justify-between mt-5 text-lg'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
            <div className='w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto mt-5'>
                {userUpdateSuccess && <Alert color='success'>{userUpdateSuccess}</Alert>}
                {error && <Alert color='failure'>{error}</Alert>}
            </div>
        </div>
    )
}

export default DashProfile