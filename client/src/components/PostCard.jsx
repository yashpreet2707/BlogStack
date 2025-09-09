import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
    return (
        <div className='group relative w-full border border-teal-500 hover:border-2 h-[350px] sm:h-[360px] overflow-hidden rounded-lg transition-all duration-300'>
            <Link to={`/post/${post?.slug}`}>
                <img src={post?.image} alt="post-cover" className='w-full h-60 object-cover group-hover:h-[200px] transition-all duration-300 z-20 cursor-pointer' />
            </Link>
            <div className="p-3 flex flex-col gap-2">
                <p className='text-lg font-semibold line-clamp-2'>{post?.title}</p>
                <span className='text-sm italic'>{post?.category}</span>
                <Link to={`/post/${post?.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 py-2 rounded-md !rounded-tl-none m-2 cursor-pointer pl-2'>
                    Read Article
                </Link>
            </div>
        </div>
    )
}

export default PostCard