import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button, Select, TextInput } from 'flowbite-react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  })
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({ ...sidebarData, searchTerm: searchTermFromUrl, sort: sortFromUrl, category: categoryFromUrl })
    }

    const fetchPosts = async () => {
      setLoading(true)
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`)
      if (!res.ok) {
        setLoading(false)
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts)
        setLoading(false)
        if (data.posts.length > 9) {
          setShowMore(true)
        } else {
          setShowMore(false)
        }
      }
    }
    fetchPosts();

  }, [location.search])

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value })
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order })
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm)
    urlParams.set('sort', sidebarData.sort)
    urlParams.set('category', sidebarData.category)

    const searchQuery = urlParams.toString();
    navigate('/search?' + searchQuery);
  }

  const handleShowMore = async () => {
    const numberofPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    const res = await fetch(`/api/post/getposts?${searchQuery}`);

    if (!res.ok) {
      return;
    }

    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts])

      if (data.posts.length === 9) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
    }
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label htmlFor="searchTerm" className='whitespace-nowrap font-semibold'>Search Term: </label>
            <TextInput id='searchTerm' type='text' placeholder='Search...' rightIcon={AiOutlineSearch} value={sidebarData.searchTerm} onChange={handleChange} />
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor="" className='font-semibold'>Sort: </label>
            <Select id='sort' value={sidebarData.sort} onChange={handleChange}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor="" className='font-semibold'>Category: </label>
            <Select id='category' value={sidebarData.category} onChange={handleChange}>
              <option value="uncategorized">Uncategorized</option>
              <option value="js">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Select>
          </div>
          <Button type='submit' className='bg-gradient-to-r from-purple-500 to-pink-500 text-white'>Apply Filters</Button>
        </form>
      </div>

      <div className='w-full'>
        <h1 className='text-3xl font-semibold p-3 mt-5 w-full text-center'>Posts results</h1>
        <div className='p-7 flex flex-col sm:flex-row gap-4 flex-wrap justify-center items-center'>
          {!loading && posts.length === 0 && (<p className='text-xl text-gray-500'>No posts found</p>)}
          {loading && (<p className='text-xl text-gray-500'>Loading...</p>)}
          {!loading && posts && posts.map(post => (
            <div className='sm:w-lg w-full'>
              <PostCard key={post._id} post={post} />
            </div>
          ))}
          {showMore && <button onClick={handleShowMore} className='text-teal-500  text-lg hover:underline p-7 w-4'>Show more</button>}
        </div>
      </div>
    </div>
  )
}

export default Search