import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPosts = () => {

    const { currentUser } = useSelector((state) => state.user)
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL

    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()

                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (currentUser.isAdmin) {
            fetchPosts()
        }

    }, [currentUser._id])

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`${BASE_URL}/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts])
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeletePost = async () => {
        try {
            const result = await fetch(`${BASE_URL}/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
                method: 'DELETE',
                credentials: "include",
            })
            const data = await result.json();
            if (!result.ok) {
                console.log(data.message)
            } else {
                setUserPosts((prev) => prev.filter(post => post._id !== postIdToDelete))
                setShowModal(false)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='h-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Date updated</TableHeadCell>
                                <TableHeadCell>Post image</TableHeadCell>
                                <TableHeadCell>Post title</TableHeadCell>
                                <TableHeadCell>Category</TableHeadCell>
                                <TableHeadCell>Delete</TableHeadCell>
                                <TableHeadCell>Edit</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        {userPosts.map((post) => (
                            <TableBody key={post._id} className='divide-y'>
                                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                                    <TableCell><Link to={`/post/${post.slug}`}><img src={post.image} alt='post' className='w-20 h-10 object-cover bg-gray-500' /></Link></TableCell>
                                    <TableCell><Link to={`/post/${post.slug}`} className='font-medium whitespace-nowrap'>{post.title}</Link></TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell><span onClick={() => {
                                        setShowModal(true);
                                        setPostIdToDelete(post._id)
                                    }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></TableCell>
                                    <TableCell>
                                        <Link to={`/update-post/${post._id}`}>
                                            <span className='text-teal-500 hover:underline'>Edit</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                    {showMore && <button onClick={handleShowMore} className='text-teal-500 w-full self-center text-sm py-7'>Show more</button>}
                </>
            ) : (<p>You have no posts yet!</p>)}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3>
                        <div className='flex justify-center gap-x-4'>
                            <Button color='failure' className='text-red-500' onClick={handleDeletePost}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default DashPosts