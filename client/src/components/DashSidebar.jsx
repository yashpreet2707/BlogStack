import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';
const DashSidebar = () => {
    const location = useLocation()
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();

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
                <SidebarItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <SidebarItem active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>Profile</SidebarItem>
                    </Link>
                    <SidebarItem icon={HiArrowSmRight} className='cursor-pointer mt-2' onClick={handleSignOut}>Sign Out</SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}

export default DashSidebar