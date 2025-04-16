import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
const DashSidebar = () => {
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
        <Sidebar className='w-full md:w-56 border-r-2 border-gray-600'>
            <SidebarItems>
                <SidebarItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <SidebarItem active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>Profile</SidebarItem>
                    </Link>
                    <SidebarItem icon={HiArrowSmRight} className='cursor-pointer mt-2'>Sign Out</SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}

export default DashSidebar