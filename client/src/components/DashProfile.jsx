import { Alert, Button, FileInput, TextInput, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
// import {uploadFile} from "../azure.js"
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutSuccess } from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector(state => state.user);
    const { currentUser, error } = useSelector(state => state.user);

    const [imageFileURL, setImageFileURL] = useState(null);
    const [finalLink, setFinalLink] = useState('');
    const [imgLoading, setImgLoading] = useState(false);
    const [localError, setLocalError] = useState("");
    const [formData, setFormData] = useState({})
    const [userUpdateSuccess, setUserUpdateSuccess] = useState(null)
    const [showModal, setShowModal] = useState(false);

    const filePickerRef = useRef();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return
        if (file) {
            setImageFileURL(URL.createObjectURL(file))
        }
        setImgLoading(true);

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
            setImgLoading(false);
        } catch (err) {
            setLocalError(err.message);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    useEffect(() => {
        setFormData({ ...formData, profilePicture: finalLink });
    }, [finalLink])

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

    const handleDeteteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const result = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            })
            const data = await result.json();
            if (!result.ok) {
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess(data))
                navigate('/sign-in')
            }

        } catch (err) {
            dispatch(deleteUserFailure(err.message))
        }
    }

    const handleSignOut = async () => {
        try {
            const result = await fetch('/api/user/signout', {
                method: 'POST',

            })
            const data = await result.json();
            if (!result.ok) {
                console.log(data.message);
            } else {
                dispatch(signOutSuccess());
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='h-full'>
            <h1 className='pt-7 mb-5 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <FileInput className='hidden w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto mt-5' type="file" accept='image/*' onChange={handleImageUpload} ref={filePickerRef} />
                <div className='w-32 h-32 self-center my-2' onClick={() => filePickerRef.current.click()}>
                    <img src={imageFileURL || currentUser.profilePicture} alt="user-img" className='rounded-full w-full h-full border-8 border-[lightgray] object-cover' />
                </div>
                <div className='w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto flex flex-col gap-4'>
                    <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser?.username} onChange={handleChange} />
                    <TextInput type='email' id='email' placeholder='username' defaultValue={currentUser?.email} onChange={handleChange} />
                    <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
                    <Button type='submit' className='bg-gradient-to-r from-purple-600 to-indigo-600' disabled={loading || imgLoading}>{loading ? "Loading..." : "Update"}</Button>
                    {
                        currentUser.isAdmin && (
                            <Link to='/create-post'>
                                <Button type='button' className='w-full bg-gradient-to-r from-purple-600 to-indigo-600' >Create a post</Button>
                            </Link>
                        )
                    }
                </div>
            </form>
            <div className='w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto text-red-500 flex justify-between mt-5 text-lg'>
                <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
                <span onClick={handleSignOut} className='cursor-pointer'>Sign Out</span>
            </div>
            <div className='w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto mt-5'>
                {userUpdateSuccess && <Alert color='success'>{userUpdateSuccess}</Alert>}
                {error && <Alert color='failure'>{error}</Alert>}
                {localError && <Alert color='failure'>{localError}</Alert>}
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
                        <div className='flex justify-center gap-x-4'>
                            <Button color='failure' onClick={handleDeteteUser}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default DashProfile 