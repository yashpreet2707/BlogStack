import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';

const Header = () => {
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL

    const path = useLocation().pathname;
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme)

    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation();

    const dispatch = useDispatch();


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')

        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }
    }, [location.search])

    const handleSignOut = async () => {
        try {
            const result = await fetch(`${BASE_URL}/api/user/signout`, {
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

    const handleSearch = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('searchTerm', searchTerm)

        const searchQuery = urlParams.toString();

        navigate(`/search?${ searchQuery }`)
    }

    return (
        <Navbar fluid className='border-b-4 h-16 fixed top-0 left-0 right-0 z-50 '>
            <Link to="/" className='self-center whitespace-nowrap text-xl ml-10'>
                <div className='flex items-center'>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                        B
                    </div>
                    <span className="font-bold hidden sm:block ml-1  dark:text-white">
                        Blog<span className="text-purple-600">Stack</span>
                    </span>
                </div>
            </Link>
            <form onSubmit={handleSearch}>
                <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </form>
            <Button className='w-15 h-10 lg:hidden' color='gray'><AiOutlineSearch size={50} /></Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {(theme === 'dark') ? <FaMoon /> : <FaSun />}
                </Button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
                        <DropdownHeader>
                            <span className="block text-sm">{currentUser.username}</span>
                            <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                        </DropdownHeader>
                        <Link to={'/dashboard?tab=profile'}>
                            <DropdownItem>Profile</DropdownItem>
                        </Link>
                        <DropdownDivider />
                        <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
                    </Dropdown>
                ) : (<Link to='/sign-in'>
                    <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 mr-10' color='gray'>Sign In</Button>
                </Link>)
                }
                <NavbarToggle />
            </div >
            <NavbarCollapse className='bg-white dark:bg-gray-800 mt-2'>
                <NavbarLink active={path === '/'} as={'div'}>
                    <Link to='/'>Home</Link>
                </NavbarLink>
                <NavbarLink active={path === '/about'} as={'div'}>
                    <Link to='/about'>About</Link>

                </NavbarLink>
                <NavbarLink active={path === '/projects'} as={'div'}>
                    <Link to='/projects'>Projects</Link>

                </NavbarLink>
            </NavbarCollapse>
        </Navbar >
    )
}

export default Header