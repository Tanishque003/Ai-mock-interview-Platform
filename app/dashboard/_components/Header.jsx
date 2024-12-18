"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={'/LOGOO.png'} width={120} height={75} alt='logo' />
        <ul className='hidden md:flex gap-6'>
          <Link href={"/dashboard"}>
            <li className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path=='/dashboard'&&'text-primary font-bold'}
            `}
            
            >Dashboard</li>
            </Link>
            < Link href={"/dashboard/code-editor"}>
            <li className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path=='/dashboard/code-editor'&&'text-primary font-bold'}
            `}>Code Editor</li>
            </Link>
<Link href={"/dashboard/upgrade"}>
  <li className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path=='/dashboard/upgrade'&&'text-primary font-bold'}
            `}>About Us</li>
</Link>
            <Link href={"/dashboard/howitworks"}>
<li className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path=='/dashboard/howitworks'&&'text-primary font-bold'}
            `}>How it Works?</li>
                </Link> 
<li className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path=='/dashboard/resume-builder'&&'text-primary font-bold'}
            `}>Resume Builder</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header
