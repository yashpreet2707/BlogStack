import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-evenly gap-4 p-3 text-center border border-teal-600 border-dotted rounded-xl my-5 sm:my-0'>
            <div className='flex-1 flex flex-col justify-center'>
                <h2 className='text-2xl font-bold'>Did you like this Project ?</h2>
                <p className='text-lg text-gray-500 my-2'>If you did, please leave a star on the repo.</p>
                <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 rounded-tl-xl rounded-bl-none mx-auto' >
                    <a href="https://github.com/yashpreet2707/BlogStack" target='_blank' rel='noopener noreferrer'>Leave a star</a>
                </Button>
            </div>
            <div className='p-7 flex-1 flex  justify-center'>
                <div className='flex items-center text-4xl'>
                    <div className="w-20 h-18 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                        B
                    </div>
                    <span className="font-bold ml-3 text-black dark:text-white">
                        Blog<span className="text-purple-600">Stack</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CallToAction