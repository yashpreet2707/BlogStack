import React from 'react'
import CallToAction from '../components/CallToAction'
function Projects() {
  return (
    <div className='min-h-[90vh] max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3 text-center'>
      <h1 className='text-3xl font-semibold'>Coming Soon...</h1>
      {/* <h1 className='text-3xl font-semibold'>Projects</h1> */}
      <p className='text-md text-gray-500'>Here you'll find a variety of blog posts on topics such as webdevelopment, and programming languages.</p>
      <CallToAction />
    </div>
  )
}

export default Projects