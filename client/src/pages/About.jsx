import React from 'react'

function About() {
  return (
    <div className='min-h-[90vh] flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>About Blog Stack</h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Blog Stack – Your own platform for all things tech and programming!
              At Blog Stack, we aim to create an amazing community for developers, tech enthusiasts, and learners alike. Whether you're just starting your coding journey or you're a seasoned programmer, Blog Stack offers something valuable for everyone.
            </p>
            <p>
              In a rapidly evolving tech landscape, staying informed is essential. Blog Stack is built to be a hub of learning and sharing for developers at every level. By bringing together cutting-edge topics, practical knowledge, and a community-driven spirit, we empower individuals to grow and succeed in their tech journeys.
            </p>
            <p>
              So, whether you’re interested in mastering React.js, delving into Next.js, or exploring the latest programming tips and tricks, Blog Stack is the perfect place to start.
              Start your learning journey today – because at Blog Stack, knowledge is just a click away!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About