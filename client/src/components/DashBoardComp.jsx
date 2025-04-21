import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiUserGroup } from 'react-icons/hi'
import { Button, Table, TableHead, TableHeadCell, TableRow, TableCell, TableBody } from "flowbite-react"
import { Link } from 'react-router-dom'
const DashBoardComp = () => {

  const { currentUser } = useSelector((state) => state.user)

  const [users, setUsers] = useState([])
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])

  const [totalUsers, setTotalUsers] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)

  const [lastMonthUsers, setLastMonthUsers] = useState(0)
  const [lastMonthComments, setLastMonthComments] = useState(0)
  const [lastMonthPosts, setLastMonthPosts] = useState(0)


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5')
        const data = await res.json()
        if (res.ok) {
          setUsers(data.users)
          setTotalUsers(data.totalUsers)
          setLastMonthUsers(data.lastMonthUsers)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5')
        const data = await res.json()
        if (res.ok) {
          setComments(data.comments)
          setTotalComments(data.totalComments)
          setLastMonthComments(data.lastMonthComments)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5')
        const data = await res.json()
        if (res.ok) {
          setPosts(data.posts)
          setTotalPosts(data.totalPosts)
          setLastMonthPosts(data.lastMonthPosts)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (currentUser.isAdmin) {
      fetchUsers()
      fetchComments()
      fetchPosts()
    }
  }, [currentUser])


  return (
    <div className='p-3 w-full mx-auto'>

      <div className='flex flex-col sm:flex-row gap-4 justify-evenly flex-wrap'>

        <div className='border border-gray-700 flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadown-md'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <div className='text-white rounded-full bg-blue-600 p-3 w-10 h-10 flex items-center justify-center'>
              <HiUserGroup />
            </div>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-green-500 flex items-center gap-1'>
              <HiArrowNarrowUp />
              {lastMonthUsers.length}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
        </div>

        <div className='border border-gray-700 flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadown-md'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <div className='text-white rounded-full bg-indigo-600 p-3 w-10 h-10 flex items-center justify-center'>
              <HiAnnotation />
            </div>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-green-500 flex items-center gap-1'>
              <HiArrowNarrowUp />
              {lastMonthComments.length}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
        </div>

        <div className='border border-gray-700 flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadown-md'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <div className='text-white rounded-full bg-lime-600 p-3 w-10 h-10 flex items-center justify-center'>
              <HiDocumentText />
            </div>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-green-500 flex items-center gap-1'>
              <HiArrowNarrowUp />
              {lastMonthPosts.length}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
        </div>

      </div>

      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>

        <div className='border border-gray-700 flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between items-center p-3 text-sm font-semibold'>
            <h1 className='text-xl'>Recent Users</h1>
            <Button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white'><Link to='/dashboard?tab=users'>See All</Link></Button>
          </div>
          <Table>
            <TableHead>
              <TableHeadCell>User image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
            </TableHead>
            {users && users.map(user => (
              <TableBody key={user._id} className='divide-y'>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>
                    <img src={user?.profilePicture} alt="" className='w-10 h-10 rounded-full bg-gray-500' />
                  </TableCell>
                  <TableCell>
                    {user?.username}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>

        <div className='border border-gray-700 flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between items-center p-3 text-sm font-semibold'>
            <h1 className='text-xl'>Recent Comments</h1>
            <Button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white'><Link to='/dashboard?tab=comments'>See All</Link></Button>
          </div>
          <Table>
            <TableHead>
              <TableHeadCell>Comment content</TableHeadCell>
              <TableHeadCell>Likes</TableHeadCell>
            </TableHead>
            {comments && comments.map(comment => (
              <TableBody key={comment._id} className='divide-y'>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell className='w-96'>
                    <p className='line-clamp-2'>{comment?.content}</p>
                  </TableCell>
                  <TableCell>
                    {comment?.numberOfLikes}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>

        <div className='border border-gray-700 flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between items-center p-3 text-sm font-semibold'>
            <h1 className='text-xl'>Recent Posts</h1>
            <Button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white'><Link to='/dashboard?tab=posts'>See All</Link></Button>
          </div>
          <Table>
            <TableHead>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
            </TableHead>
            {posts && posts.map(post => (
              <TableBody key={post._id} className='divide-y'>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>
                    <img src={post?.image} alt="" className='w-14 h-10 bg-gray-500' />
                  </TableCell>
                  <TableCell>
                    <p className='line-clamp-2'>{post?.title}</p>
                  </TableCell>
                  <TableCell>
                    {post?.category}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>

      </div>

    </div>
  )
}

export default DashBoardComp