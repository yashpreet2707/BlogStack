import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Button, Textarea } from 'flowbite-react'

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
    const { currentUser } = useSelector(state => state.user)
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL


    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/user/${comment?.userId}`)
                const data = await res.json();

                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getUser();
    }, [comment])


    const handleEdit = (commentId) => {
        setIsEditing(true);
        setEditedContent(comment.content)
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/comment/editComment/${comment?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: editedContent,
                })
            })

            if (res.ok) {
                setIsEditing(false);
                onEdit(comment?._id, editedContent);
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    if (!comment) return null;
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className='w-10 h-10 rounded-full object-cover bg-gray-200' src={user?.profilePicture} alt="" />
            </div>
            <div>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user?.username}` : 'Anonymous user'}</span>
                    <span className='text-gray-500 text-xs'>{moment(comment?.createdAt).fromNow()} </span>
                </div>

                {isEditing ? (
                    <>
                        <Textarea
                            className='mb-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className='flex gap-2'>
                            <Button type='submit' size='xs' className='bg-gradient-to-r from-purple-600 to-indigo-600' onClick={handleSave} >Save</Button>
                            <Button type='submit' size='xs' className='bg-gradient-to-r from-purple-600 to-indigo-600' onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='text-gray-400 pb-2'>{comment?.content}</p>
                        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 gap-1 max-w-fit'>
                            <button type='button' onClick={() => onLike(comment?._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>{comment.numberOfLikes > 0 && comment.numberOfLikes} {comment.numberOfLikes === 1 && 'like'} {comment.numberOfLikes > 1 && 'likes'}</p>
                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <>
                                    <button onClick={() => handleEdit(comment?._id)} type='button' className='text-gray-400 hover:text-blue-500'>Edit</button>
                                    <button onClick={() => onDelete(comment?._id)} type='button' className='text-gray-400 hover:text-blue-500'>Delete</button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Comment