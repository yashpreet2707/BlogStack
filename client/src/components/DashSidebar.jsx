import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
const DashSidebar = () => {
    const location = useLocation()
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();

    const { currentUser } = useSelector(state => state.user) ;

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromURL = urlParams.get('tab')
        if (tabFromURL) {
            setTab(tabFromURL)
        }
    }, [location.search])


    const handleSignOut = async () => {
        try {
            const result = await fetch('/api/user/signout', {
                method: 'POST',

            })
            const data = await result.json();
            if (!result.ok) {
                console.log(data.message);
            } else {
                dispatch(signOutSuccess());
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Sidebar className='w-full border-r-2 border-gray-600'>
            <SidebarItems>
                <SidebarItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard?tab=profile'>
                        <SidebarItem active={tab === 'profile'} icon={HiUser} label={currentUser?.isAdmin ? "Admin" : "User"} labelColor='dark'as='div'>Profile</SidebarItem>
                    </Link>
                    {currentUser?.isAdmin && <Link to='/dashboard?tab=posts'>
                        <SidebarItem active={tab === 'posts'} icon={HiDocumentText} as='div'>Posts</SidebarItem>
                    </Link>}
                    <SidebarItem icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>Sign Out</SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}

export default DashSidebar