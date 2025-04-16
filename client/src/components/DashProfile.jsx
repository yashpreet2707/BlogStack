import { Button, TextInput } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className='h-full'>
            <h1 className='pt-7 mb-5 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <div className='w-32 h-32 self-center my-2'>
                    <img src={currentUser.profilePicture} alt="user-img" className='rounded-full w-full h-full border-8 border-[lightgray] object-cover' />
                </div>
                <div className='w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto flex flex-col gap-4'>
                    <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser?.username} />
                    <TextInput type='email' id='email' placeholder='username' defaultValue={currentUser?.email} />
                    <TextInput type='password' id='username' placeholder='password' />
                    <Button className='bg-gradient-to-r from-purple-600 to-indigo-600'>Update</Button>
                </div>
            </form>
            <div className='w-[70vw] sm:w-[40vw] md:w-[30vw] mx-auto text-red-500 flex justify-between mt-5 text-lg'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default DashProfile