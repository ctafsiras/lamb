import React from 'react'
import { useState } from 'react'
import { FaBeer, FaPhone } from 'react-icons/fa';
import { BiDonateBlood } from 'react-icons/bi';
import { HiOutlineMail, HiLockClosed, HiUser, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [eligibility, setEligibility] = useState('');
    const [last_donate, setLastDonate] = useState('');
    const [blood_type, setBloodType] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password }
        setLoading(true);
        const res = await fetch('https://lamb-backend.herokuapp.com//backend/save-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        const data = await res.json();
        if (data > 0) {
            setLoading(false);
            Cookies.set('myId', data, { expires: 365 })
            router.push('/')
        }
    }
    return (
        <div className="">
            <div className="p-8 lg:w-1/2 mx-auto">
                <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                    <p className="text-center text-3xl text-black font-bold">
                        Login Account
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6">

                        <span className='ml-2 mt-3 text-xs'>Enter Your Email:</span>
                        <div className="relative mt-1">
                            <input onChange={(e) => setEmail(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="email" type="email" placeholder="Email" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <HiOutlineMail />
                            </div>
                        </div>
                        <span className='ml-2 mt-3 text-xs'>Enter Your Password:</span>
                        <div className="relative mt-1">
                            <input onChange={(e) => setPassword(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="password" type="password" placeholder="Password" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <HiLockClosed />
                            </div>


                        </div>
                        {
                            loading && <div className="flex justify-center items-center">
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                            </div>
                        }
                        <div className="flex items-center justify-center mt-8">          <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"          >            Login Account          </button>        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
