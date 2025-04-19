import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button, Textarea } from 'flowbite-react'
import { Comment } from './Comment'

const CommentSection = ({ postId }) => {

    const { currentUser } = useSelector(state => state.user)

    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)
    const [comments, setComments] = useState([])


    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`)
                const data = await res.json();

                if (res.ok) {
                    setCommentError(null)
                    setComment('')
                    setComments(data)
                } else {
                    console.log(data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getComments();
    }, [postId])


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
        <div className='max-w-2xl sm:ml-16 md:ml-52'>
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
                    {commentError && <Alert color='failure'>{commentError}</Alert>}
                </form>
            )}
            {(comments.length === 0) ? <p className='text-sm my-5'>No comments yet.</p> : (
                <>
                    <div className='flex items-center gap-1 text-sm my-5'>
                        <p>Comments: </p>
                        <div className='border brder-gray-500 py-1 px-2 rounded-sm'>{comments.length}</div>
                    </div>
                    {comments.map(comment => <Comment key={comment._id} comment={comment} />)}
                </>
            )}
        </div>
    )
}

export default CommentSection