import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';

function DashBoard() {
    const location = useLocation()
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromURL = urlParams.get('tab')
        if (tabFromURL) {
            setTab(tabFromURL)
        }
    }, [location.search])

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-[20vw]'><DashSidebar /></div>
            {tab === 'profile' && <div className='md:w-[80vw]'><DashProfile /></div>}
            {tab === 'posts' && <div className='md:w-[80vw]'><DashPosts /></div>}
            {tab === 'users' && <div className='md:w-[80vw]'><DashUsers /></div>}
        </div>
    )
}

export default DashBoard