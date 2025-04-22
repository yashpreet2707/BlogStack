import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import CallToAction from '../components/CallToAction'
import CommentSection from '../components/CommentSection'
import PostCard from '../components/PostCard'

const PostPage = () => {

    const { postSlug } = useParams();
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)

    const [recentPosts, setRecentPosts] = useState([])


    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${BASE_URL}/api/post/getposts?slug=${postSlug}`)
                const data = await response.json();
                if (!response.ok) {
                    setError(true)
                    setLoading(false)
                    return;
                } else {
                    setLoading(false)
                    setError(false)
                    setPost(data.posts[0])
                }
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchPost()
    }, [postSlug])

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`${BASE_URL}/api/post/getposts?limit=3`)
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts)
                }
            }
            fetchRecentPosts()
        } catch (error) {
            console.log(error.message)
        }
    }, [])


    if (loading) return <div className='flex justify-center items-center min-h-screen'><Spinner size='xl' /></div>
    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
            <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
                <Button color='gray' pill size='xs'>{post && post.category}</Button>
            </Link>
            <img src={post && post.image} alt={post && post.title} className='w-full max-h-[600px] object-cover  mt-5' />
            <div className='flex justify-between items-center p-3 mt-5 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} min read</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post && post.content }} className='p-3 max-w-2xl mx-auto w-full post-content'>

            </div>
            <div>
                <CallToAction />
            </div>
            <CommentSection postId={post && post?._id} />

            <div className='flex flex-col justify-center items-center my-5'>
                <h1 className='text-xl font-bold mt-3'>Recent Articles</h1>
                <div className='flex flex-col sm:flex-row gap-5 justify-center items-center my-10'>
                    {
                        recentPosts && recentPosts.map((post) => <PostCard post={post} key={post._id} />)
                    }
                </div>
            </div>
        </main>
    )
}

export default PostPage