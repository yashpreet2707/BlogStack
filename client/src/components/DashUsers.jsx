import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
const DashUsers = () => {

    const { currentUser } = useSelector((state) => state.user)
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL

    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/user/getusers`, {
                    method: 'GET',
                    credentials: "include",
                })
                const data = await res.json()

                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length <= 9) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (currentUser.isAdmin) {
            fetchUsers()
        }

    }, [currentUser._id, currentUser.isAdmin])

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`${BASE_URL}/api/user/getusers?startIndex=${startIndex}`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users])
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteUser = async () => {
        try {
            const result = await fetch(`${BASE_URL}/api/user/delete/${userIdToDelete}`, {
                method: 'DELETE',
                credentials: "include",
            })
            const data = await result.json()
            if (result.ok) {
                setUsers(users.filter((user) => user._id !== userIdToDelete))
                setShowModal(false)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Date created</TableHeadCell>
                                <TableHeadCell>User image</TableHeadCell>
                                <TableHeadCell>Username</TableHeadCell>
                                <TableHeadCell>Email</TableHeadCell>
                                <TableHeadCell>Admin</TableHeadCell>
                                <TableHeadCell>Delete</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        {users.map((user) => (
                            <TableBody TableBody key={user._id} className='divide-y' >
                                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell><img src={user.profilePicture} alt={user.username} className='w-10 h-10 object-cover bg-gray-500 rounded-full' /></TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.isAdmin ? <FaCheck className='text-green-500' /> : <FaTimes className='text-red-500' />}</TableCell>
                                    <TableCell><span onClick={() => {
                                        setShowModal(true);
                                        setUserIdToDelete(user._id)
                                    }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                    {showMore && <button onClick={handleShowMore} className='text-teal-500 w-full self-center text-sm py-7'>Show more</button>}
                </>
            ) : (<p>You have no users!</p>)
            }
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this user?</h3>
                        <div className='flex justify-center gap-x-4'>
                            <Button color='failure' className='text-red-500' onClick={handleDeleteUser}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default DashUsers