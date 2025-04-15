import React from 'react'
import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"
const Header = () => {
    const path = useLocation().pathname;
    return (
        <Navbar fluid className='border-b-4 h-16'>
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
            <form>
                <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline' />
            </form>
            <Button className='w-12 h-10 lg:hidden pill' color='gray'><AiOutlineSearch /></Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon />
                </Button>
                <Link to='/sign-in'>
                    <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 mr-10' color='gray'>Sign In</Button>
                </Link>
                <NavbarToggle />
            </div>
            <NavbarCollapse>
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
        </Navbar>
    )
}

export default Header