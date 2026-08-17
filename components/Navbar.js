"use client"
import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {



  const [showDropDown, setShowDropDown] = useState(false)
  const { data: session } = useSession()


  return (
    <nav  className='bg-gray-900 text-white px-4 flex md:flex-row flex-col justify-between items-center min-h-16'>
      <Link href={"/"} className="logo font-bold text-lg flex items-center justify-center md:pr-0 pr-12">
        <Image src="/tea.gif" alt="Chai Cup" width={50} height={50} />
        <span>GetmeAChai</span>
      </Link>
      <div className='relative flex items-center justify-center md:flex-nowrap flex-wrap'>
          <Link href={"/"}>
            <button type="button" className="text-white cursor-pointer  font-medium rounded-base text-md md:px-4 px-1 md:pt-4 pt-1 py-2.5 text-center leading-5 me-2 md:mb-2">Home</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-white cursor-pointer  font-medium rounded-base text-md md:px-4 px-1 md:pt-4 pt-1 py-2.5 text-center leading-5 me-2 md:mb-2 ">About</button>
          </Link>
        {session && <div className="flex items-center justify-center gap-3">


          <button onClick={() => {setShowDropDown(!showDropDown)}} onBlur={()=>{setTimeout(() => {
            setShowDropDown(false)
          }, 300);}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className={`inline-flex cursor-pointer items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-1 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm md:px-4 py-2.5 focus:outline-none`} type="button">
            Welcome {session.user.name}
            <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
          </button>

          <div id="dropdown" className={`z-10 ${showDropDown ? "" : "hidden"} bg-slate-800 border border-olive-300 rounded-md absolute md:top-13 min-[404px]:top-11 md:right-25 min-[404px]:right-19 top-20 right-31 border-default-medium rounded-base shadow-lg w-44`}>
            <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${encodeURIComponent(session?.user?.name)}`}  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Your Page</Link>
              </li>
              <li>
                <Link href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Earnings</Link>
              </li>
              <li>
                <Link onClick={()=>signOut()} href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</Link>
              </li>
            </ul>
          </div>


          <button onClick={() => signOut()} type="button" className=" text-white cursor-pointer bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:focus:ring-blue-800 font-medium rounded-base md:text-sm text-[0.75rem] md:px-4 px-2 md:py-2.5 p-0.5 md:h-auto h-7 text-center leading-5 me-2 mb-2">Log Out</button></div>}
        {!session &&
          <Link href={"/login"} className="flex items-center justify-center text-white cursor-pointer bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:focus:ring-blue-800 font-medium rounded-base md:text-sm text-[0.75rem] md:px-4 px-2 md:py-2.5 p-0.5 md:h-auto h-7 text-center leading-5 me-2 mb-2">
            <button type="button" >Log in</button>
          </Link>}
      </div>
    </nav>
  )
}

export default Navbar
