import { Textarea, Button, Alert } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Comment from './Comment'
import { Modal, ModalHeader, ModalBody } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const CommentSection = ({ postId }) => {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL

    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()

    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState('')
    const [comments, setComments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [commentToDelete, setCommentToDelete] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) return;
        try {
            const res = await fetch(`${BASE_URL}/api/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
                credentials: "include",
            })

            const data = await res.json();

            if (res.ok) {
                setComment('')
                setCommentError(null)
                setComments([data, ...comments])
            }
        } catch (error) {
            setCommentError(error.message)
        }
    }


    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/ api / comment / getPostComments / ${postId}`)
                const data = await res.json();

                if (res.ok) {
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getComments();
    }, [postId])


    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                alert('You must be signed in to like a comment')
                navigate('/sign-in')
                return;
            }
            const res = await fetch(`/ api / comment / likecomment / ${commentId}`, {
                method: 'PUT',
                credentials: "include",
            })
            if (res.ok) {
                const data = await res.json();
                setComments(comments.map(comment =>
                    comment._id === commentId
                        ? { ...comment, likes: data.likes, numberOfLikes: data.likes.length }
                        : comment
                ));
            }
        } catch (error) {
            console.log("yahan FRONTEND likes me error catch ho rahi hai");
            console.log(error.message)
        }
    }

    const handleEdit = async (commentId, editedContent) => {
        try {
            setComments(comments.map(comment => comment._id === commentId ? { ...comment, content: editedContent } : comment))
        } catch (error) {
            console.log(error.message)
        }
    }


    const handleDelete = async (commentId) => {
        try {
            const res = await fetch(`/ api / comment / deletecomment / ${commentId}`, {
                method: 'DELETE',
                credentials: "include",
            })
            if (res.ok) {
                setComments(comments.filter(comment => comment._id !== commentId))
                setShowModal(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='max-w-2xl sm:w-2xl sm:mx-auto p-3'>
            {currentUser ? (
                <div className='flex justify-center items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as: </p>
                    <img className='h-5 w-5 object-cover rounded-full' src={currentUser && currentUser?.profilePicture} alt="" />
                    <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-500 text-underline'>
                        @{currentUser?.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm my-5 flex gap-1'>
                    You must be signed in to comment
                    <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
                </div>
            )}
            {currentUser && (
                <div>
                    <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3 w-full'>
                        <Textarea placeholder='Add a comment...' rows='3' cols='2' maxLength={200} onChange={e => setComment(e.target.value)} value={comment} />
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-gray-500 text-sm'>{200 - comment.length} characters remaining</p>
                            <Button type='submit' className='bg-gradient-to-r from-purple-600 to-indigo-600 ' color='gray' size='xs'>Comment</Button>
                        </div>
                    </form>
                    {commentError && <Alert className='mt-5' color='red'>{commentError}</Alert>}
                </div>
            )}
            {comments.length === 0 ? (
                <p className='text-sm my-5'>No comments yet!</p>
            ) : (
                <>
                    <div className='flex items-center text-sm my-5 gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments && comments.map((comment, index) => <Comment key={comment && comment._id || index} comment={comment} onLike={handleLike} onEdit={handleEdit} onDelete={(commentId) => {
                        setShowModal(true)
                        setCommentToDelete(commentId)
                    }} />)}
                </>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
                        <div className='flex justify-center gap-x-4'>
                            <Button color='failure' onClick={() => handleDelete(commentToDelete)}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default CommentSection