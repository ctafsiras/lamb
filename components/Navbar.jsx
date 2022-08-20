import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
    const router = useRouter()
    return (

        <nav className={`bg-white shadow ${(router.pathname === '/register' || '/login') && 'hidden'}`}>
            <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                <div className="flex items-center justify-between">
                    <div>
                        <a className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform  lg:text-3xl hover:text-gray-700" href="#">Lamb</a>
                    </div>

                    {/* <!-- Mobile menu button --> */}
                    <div className="flex md:hidden">
                        <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 " aria-label="toggle menu">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
                <div className="items-center md:flex">
                    <div className="flex flex-col md:flex-row md:mx-6">
                        <Link href="/">
                            <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform hover:text-blue-500 md:mx-4 md:my-0">Feed</a></Link>
                        <Link href="/bloodbank">
                            <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform hover:text-blue-500 md:mx-4 md:my-0">Blood Bank</a></Link>
                        <Link href="/bloodrequest">
                            <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform hover:text-blue-500 md:mx-4 md:my-0">Blood Request</a></Link>

                        <Link href="profile">
                            <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform hover:text-blue-500 md:mx-4 md:my-0">Profile</a></Link>
                       
                    </div>
                </div>
            </div>
        </nav>
    )
}
