import React, { useEffect, useState } from 'react'
import CallToAction from '../components/CallToAction'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'

function Home() {
  const [posts, setPosts] = useState([])
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL


  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`${BASE_URL}/api/post/getposts`)
        const data = await res.json()
        if (res.ok) {
          setPosts(data.posts)
        }
      }
      fetchPosts()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div>
      <div className='flex flex-col gap-4 px-3 pt-20 pb-10 max-w-6xl mx-auto border-b border-gray-500'>
        <h1 className='text-3xl font-bold lg:text-5xl'>Welcome to Blog Stack!</h1>
        <p className='text-gray-500 text-sm lg:text-lg'>Here you'll find a variety of blog posts on topics such as webdevelopment, and programming languages.</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View All Posts</Link>
      </div>
      <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h2 className='text-3xl font-bold text-center my-5'>Recent Posts</h2>
            {posts.length === 0 ? (<>Loading...</>) : (<div className='p-3 flex flex-col sm:flex-row gap-4 flex-wrap justify-center items-center'>
              {posts.map(post => (
                <div key={post._id} className='sm:w-lg w-full'>
                  <PostCard key={post._id} post={post} />
                </div>
              ))}
            </div>)}
            <Link to={'/search'} className='text-lg mx-auto text-teal-500 font-bold hover:underline'>View All Posts</Link>
          </div>
        )}
      </div>
      <div className='p-3'>
        <CallToAction />
      </div>
    </div>
  )
}

export default Home