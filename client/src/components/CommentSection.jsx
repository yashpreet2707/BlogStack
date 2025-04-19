import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button, Textarea } from 'flowbite-react'
const CommentSection = ({ postId }) => {

    const { currentUser } = useSelector(state => state.user)

    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (comment.length > 200) return;

        try {
            const res = await fetch(`/api/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                })
            })

            const data = await res.json();

            if (res.ok) {
                setComment('')
                setCommentError(null)
            } else {
                setCommentError(data.message)
            }
        } catch (error) {
            setCommentError(error.message)
        }

    }

    return (
        <div className='max-w-2xl sm:ml-52'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-xs mx-auto'>
                    <p>Signed in as:</p>
                    <img className='h-5 w-5 object-cover rounded-full' src={currentUser && currentUser.profilePicture} alt="" />
                    <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>@{currentUser && currentUser.username}</Link>
                </div>
            ) : (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    <p>You must be signed in to leave a comment.</p>
                    <Link to='/sign-in' className='text-blue-500 hover:underline'>Sign In</Link>
                </div>
            )}
            {currentUser && (
                <form onSubmit={handleSubmit} className='border border-teal-500 rounded-lg p-3'>
                    <Textarea placeholder='Add a comment...' rows='3' maxLength={200} required value={comment} onChange={e => setComment(e.target.value)} />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-xs text-gray-500'>{200 - comment.length} characters remaining.</p>
                        <Button className='bg-gradient-to-r from-purple-600 to-indigo-600' type='submit' color='gray' size='xs'>Comment</Button>
                    </div>
                </form>
                {commentError && <Alert color='failure'>{commentError}</Alert>}
            )}
        </div>
    )
}

export default CommentSection