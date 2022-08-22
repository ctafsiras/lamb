import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

export default function FeedCard({ post, me, myPost }) {
    let token = Cookies.get('token')
    const [user, setUser] = useState({});
    useEffect(() => {

        axios.get(`https://lamb-backend.herokuapp.com/backend/get-user/${post.userFK}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setUser(res.data)
            })
            .catch((error) => {
                console.error(error)
            })


    }, []);


    const handleDelete = async () => {
        const yes = confirm('Are You 100% sure to Delete it?')
        if (yes) {
            const res = await fetch(`https://lamb-backend.herokuapp.com/backend/delete-post/${post.postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
        }
    }
    const handleSolveUpdate = async () => {
        const newPost = post;
        newPost.lastStatus = post.lastStatus === "SOLVED" ? "UNSOLVED" : "SOLVED";
        const yes = confirm('Are You sure?')
        if (yes) {
            const res = await fetch(`https://lamb-backend.herokuapp.com/backend/update-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost)
            })
            const data = await res.json();
        }

    }

    return (
        <div className="p-12 md:w-1/2 flex flex-col items-start">
            <a className="inline-flex items-center">
                <img alt="blog" src="https://dummyimage.com/103x103" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">{user?.username}</span>
                    <span className="text-gray-400 text-xs tracking-widest mt-0.5 border p-1">{post.lastStatus}</span>
                </span>
            </a>
            <p className="leading-relaxed mb-8  border-t-2 mt-2 border-gray-100">
                {post.postDetails}
            </p>
            <div className="flex items-center flex-wrap pb-4 mb-4 mt-auto w-full">
                {/* <p className="text-indigo-500 inline-flex items-center">
                    Required Blood Group:<span className='text-red-700 ml-2 font-bold'> B(+ve)</span>

                </p> */}
                <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    Poseted: 10 Sep 2022
                </span>
                {myPost ?
                    <div className='flex items-center'>
                        <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer mr-4">
                            <input onChange={handleSolveUpdate} type="checkbox" checked={post.lastStatus === "SOLVED" && true} id="default-toggle" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-1 text-sm font-medium text-gray-900">{post.lastStatus}</span>
                        </label>
                        <button onClick={handleDelete} className='bg-red-800 text-white py-1 rounded-md px-2'>Delete</button>
                    </div>
                    :
                    <a href={`tel:+88${user?.phone}`} className="text-white bg-green-700 rounded-lg hover:bg-green-800 px-3 py-2 inline-flex items-center leading-none text-md">
                        Connect Now
                    </a>}
            </div>



        </div>
    )
}