"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Header() {

    const path = usePathname();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        console.log(path);
    }, [path]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Link href="/dashboard">
                <Image src={'/LOGOO.png'} width={120} height={75} alt='logo' />
            </Link>
            <ul className='hidden md:flex gap-6'>
                <Link href={"/dashboard"}>
                    <li className={`hover:text-primary hover:font-bold transition-all
                        cursor-pointer
                        ${path === '/dashboard' && 'text-primary font-bold'}
                    `}>Dashboard</li>
                </Link>
                <Link href={"/dashboard/code-editor"}>
                    <li className={`hover:text-primary hover:font-bold transition-all
                        cursor-pointer
                        ${path === '/dashboard/code-editor' && 'text-primary font-bold'}
                    `}>Code Editor</li>
                </Link>
                <Link href={"/dashboard/upgrade"}>
                    <li className={`hover:text-primary hover:font-bold transition-all
                        cursor-pointer
                        ${path === '/dashboard/about-us' && 'text-primary font-bold'}
                    `}>About Us</li>
                </Link>
                <Link href={"/dashboard/howitworks"}>
                    <li className={`hover:text-primary hover:font-bold transition-all
                        cursor-pointer
                        ${path === '/dashboard/howitworks' && 'text-primary font-bold'}
                    `}>How it Works?</li>
                </Link>
                <Link href={"/dashboard/resume-builder"}>
                    <li className={`hover:text-primary hover:font-bold transition-all
                        cursor-pointer
                        ${path === '/dashboard/resume-builder' && 'text-primary font-bold'}
                    `}>Resume Builder</li>
                </Link>
            </ul>
            <div className='flex items-center space-x-4'>
                <button className="text-sm font-semibold text-gray-600 hover:text-gray-800">Help</button>
                <button className="text-sm font-semibold text-gray-600 hover:text-gray-800">Contact</button>
            </div>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={toggleDarkMode} 
                    className="text-xl text-gray-600 hover:text-gray-800"
                    aria-label="Toggle Dark Mode"
                >
                    {darkMode ? '☀' : '🌙'}
                </button>
                <UserButton />
            </div>
        </div>
    );
}

export default Header;
