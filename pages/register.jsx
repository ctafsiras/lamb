import React from 'react'
import { useState } from 'react'
import { FaBeer, FaPhone } from 'react-icons/fa';
import { BiDonateBlood } from 'react-icons/bi';
import { HiOutlineMail, HiLockClosed, HiUser, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function register() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [area, setArea] = useState('');
    const [role, setRole] = useState('ROLE_VISITOR');
    const [dob, setDob] = useState('');

    const [eligibility, setEligibility] = useState('');
    const [last_donate, setLastDonate] = useState('');
    const [blood_type, setBloodType] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, email, password, phone, area, dob, role, eligibility, last_donate, blood_type }
        setLoading(true);
        const res = await fetch('https://lamb-backend.herokuapp.com/backend/save-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        const data = await res.json();
        console.log(data);
        if (data.token) {
            setLoading(false);
            Cookies.set('token', data.token, { expires: 15 })
            router.push('/')
        }
    }
    return (
        <div className="">
            <div className="p-8 lg:w-1/2 mx-auto">
                <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                    <p className="text-center text-3xl text-black font-bold">
                        Register Account
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6">
                        <span className='ml-2 mb-1 text-xs'>Enter Your Email:</span>
                        <div className="relative">

                            <input required onChange={(e) => setUsername(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="username" type="text" placeholder="Name" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <HiUser />
                            </div>
                        </div>
                        <span className='ml-2 mt-3 text-xs'>Enter Your Email:</span>
                        <div className="relative mt-1">
                            <input required onChange={(e) => setEmail(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="email" type="email" placeholder="Email" />
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
                        <span className='ml-2 mt-3 text-xs'>Enter Your Phone:</span>
                        <div className="relative mt-1">
                            <input onChange={(e) => setPhone(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="phone" type="text" placeholder="Phone" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <FaPhone />
                            </div>
                        </div>
                        <span className='ml-2 mt-3 text-xs'>Enter Your Address:</span>
                        <div className="relative mt-1">
                            <input onChange={(e) => setArea(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="area" type="text" placeholder="Area" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <HiLocationMarker />
                            </div>
                        </div>
                        <span className='ml-2 mt-3 text-xs'>Enter Your Date Of Birth:</span>
                        <div className="relative mt-1">
                            <input required onChange={(e) => setDob(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="bateofbirth" type="date" placeholder="Date of Birth" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <HiCalendar />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center text-gray-500">
                            <input onChange={(e) => setRole(e.target.checked ? "ROLE_DONOR" : 'ROLE_VISITOR')} type="checkbox" id="role" className="mr-2" />
                            <p className="text-sm" htmlFor="role">
                                As a Donor?
                            </p>
                        </div>
                        <div className={role === 'ROLE_VISITOR' && 'hidden'}>
                            <span className='ml-2 mt-3 text-xs'>Enter Your Eligibility:</span>
                            <div className="relative mt-1">
                                <input onChange={(e) => setEligibility(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="eligibility" type="text" placeholder="Yes or No" />
                                <div className="absolute left-4 inset-y-0 flex items-center">
                                    <BiDonateBlood />
                                </div>
                            </div>
                            <span className='ml-2 mt-3 text-xs'>Enter Last Blood Donate Date:</span>
                            <div className="relative mt-1">
                                <input onChange={(e) => setLastDonate(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="last_donate" type="date" placeholder="Last Donate" />
                                <div className="absolute left-4 inset-y-0 flex items-center">
                                    <HiCalendar />
                                </div>
                            </div>
                            <span className='ml-2 mt-3 text-xs'>Enter Your Blood Type:</span>
                            <div className="relative mt-1">

                                <input onChange={(e) => setBloodType(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="blood_type" type="text" placeholder="Blood Type" />
                                <div className="absolute left-4 inset-y-0 flex items-center">
                                    <BiDonateBlood />
                                </div>
                            </div>
                        </div>
                        {
                            loading && <div className="flex justify-center items-center">
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                            </div>
                        }
                        <div className="flex items-center justify-center mt-8">          <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"          >            Create Account          </button>        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
