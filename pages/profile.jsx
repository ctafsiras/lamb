import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
export default function profile() {
    const [me, setMe] = useState({});
    const myId = Cookies.get('myId');
    useEffect(() => {
        async function load() {
            const response = await fetch(`https://lamb-backend.herokuapp.com/backend/get-user/${myId}`);
            const data = await response.json();
            setMe(data);
        }
        load();
    }, [myId])
    return (
        <div className="p-16">
            <div className="p-8 bg-white shadow mt-24">
                <div className="grid grid-cols-1">
                    <div className="relative">
                        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-24 w-24"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >

                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                </div>
                <div className="mt-32 text-center border-b pb-12">

                    <h1 className="text-4xl font-medium text-gray-700">
                        {me.username}, <span className="font-light text-gray-500">27</span>
                    </h1>
                    <p className="font-light text-gray-600 mt-3">{me.area}</p>
                    <p className="mt-8 text-gray-500">
                        Solution Manager - Creative Tim Officer
                    </p>
                    <p className="mt-2 text-gray-500">University of Computer Science</p>
                </div>
                <div className="mt-12 flex flex-col justify-center">


                </div>
            </div>
        </div>
    );
}
