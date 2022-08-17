import React from 'react'
import { useState } from 'react'
import { FaBeer, FaPhone } from 'react-icons/fa';
import { HiOutlineMail, HiLockClosed, HiUser, HiLocationMarker, HiCalendar } from 'react-icons/hi';

export default function register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [area, setArea] = useState('');
    const [role, setRole] = useState('user');
    const [dob, setDob] = useState('');

    const [eligibility, setEligibility] = useState('');
    const [lastDonate, setLastDonate] = useState('');
    const [bloodType, setBloodType] = useState('');
    const handleSubmit=(e)=>{
e.preventDefault(); 
        const user ={username,email, password, phone, area, dob, role}
        fetch('https://lamb-backend.herokuapp.com/user/register', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    }
    return (
        <div className="bg-gray-200">
            <div className="p-8 lg:w-1/2 mx-auto">
                <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
                    <p className="text-center text-3xl text-black font-bold">
                        Register Account
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="relative">
                            <input onChange={(e)=>setUsername(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="username" type="text" placeholder="Name" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                            <HiUser />
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input onChange={(e)=>setEmail(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="email" type="email" placeholder="Email" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                            <HiOutlineMail/>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input onChange={(e)=>setPassword(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="password" type="password" placeholder="Password" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <HiLockClosed/>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input onChange={(e)=>setPhone(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="phone" type="text" placeholder="Phone" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <FaPhone/>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input onChange={(e)=>setArea(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="area" type="text" placeholder="Area" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <HiLocationMarker/>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input onChange={(e)=>setDob(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="bateofbirth" type="date" placeholder="Date of Birth" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <HiCalendar/>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center text-gray-500">
                            <input onChange={(e)=>setRole(e.target.checked?"donor": 'user')} type="checkbox" id="role" name="role" className="mr-2" />
                            <p className="text-sm" htmlFor="role">
                               As a Donor?
                            </p>
                        </div>
                       <div className={role==='user'&& 'hidden'}>
                       <div className="relative mt-3">
                            <input onChange={(e)=>setEligibility(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="eligibility" type="text" placeholder="Yes or No" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor"            >
                                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input onChange={(e)=>setLastDonate(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="last_donate" type="date" placeholder="Last Donate" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <HiCalendar/>
                            </div>
                        </div>
                        <div className="relative mt-3">
                            <input onChange={(e)=>setBloodType(e.target.value)} className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline" id="blood_type" type="text" placeholder="Blood Type" />
                            <div className="absolute left-4 inset-y-0 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-3 text-gray-400 p-1" viewBox="0 0 20 20" fill="currentColor"            >
                                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                </svg>
                            </div>
                        </div>
                       </div>
                        <div className="flex items-center justify-center mt-8">          <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"          >            Create Account          </button>        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
