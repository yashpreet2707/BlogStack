import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashComments = () => {

    const { currentUser } = useSelector((state) => state.user)
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL

    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${BASE_URL}/api/comment/getcomments`, {
                    method: "GET",
                    credentials: "include",
                })
                const data = await res.json()

                if (res.ok) {
                    setComments(data.comments);
                    setLoading(false);
                    if (data.comments.length < 5) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }

        if (currentUser.isAdmin) {
            fetchComments()
        }

    }, [currentUser._id])

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`${BASE_URL}/api/comment/getcomments?startIndex=${startIndex}`)
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => [...prev, ...data.comments])
                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteComment = async () => {
        try {
            const result = await fetch(`${BASE_URL}/api/comment/deletecomment/${commentIdToDelete}`, {
                method: 'DELETE',
            })
            const data = await result.json()
            if (result.ok) {
                setComments(comments.filter((comment) => comment._id !== commentIdToDelete))
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
            {!loading ? (
                (comments.length === 0) ? (<p>You have no comments!</p>) : (<>
                    <Table hoverable className='shadow-md'>
                        <TableHead>
                            <TableRow className='whitespace-nowrap'>
                                <TableHeadCell>Date updated</TableHeadCell>
                                <TableHeadCell>Comment content</TableHeadCell>
                                <TableHeadCell>Number of likes</TableHeadCell>
                                <TableHeadCell>PostId</TableHeadCell>
                                <TableHeadCell>UserId</TableHeadCell>
                                <TableHeadCell>Delete</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        {comments.map((comment) => (
                            <TableBody TableBody key={comment._id} className='divide-y' >
                                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800 whitespace-nowrap'>
                                    <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{comment.content}</TableCell>
                                    <TableCell>{comment.numberOfLikes}</TableCell>
                                    <TableCell>{comment.postId}</TableCell>
                                    <TableCell>{comment.userId}</TableCell>
                                    <TableCell><span onClick={() => {
                                        setShowModal(true);
                                        setCommentIdToDelete(comment._id)
                                    }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                    {showMore && <button onClick={handleShowMore} className='text-teal-500 w-full self-center text-sm py-7'>Show more</button>}
                </>)
            ) : (<div>Loading...</div>)
            }
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment?</h3>
                        <div className='flex justify-center gap-x-4'>
                            <Button color='failure' className='text-red-500' onClick={handleDeleteComment}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default DashComments