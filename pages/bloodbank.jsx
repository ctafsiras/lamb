import Cookies from 'js-cookie';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import DonorCard from '../components/DonorCard'
import toast from "react-hot-toast";

export default function bloodbank({ donors, me, visitorHistory }) {
    let token = Cookies.get('token')
    const [reqSent, setReqSent] = useState(false)
    const handleRequest = async (his) => {
        const requestData = {
            donorId: his.donorId,
            requestId: me.userId,
            bloodType: his.bloodType,
        }
        console.log(requestData);
        const res = await fetch("https://lamb-backend.herokuapp.com/backend/request-blood", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestData)
        })
        const data = await res.json();
        setReqSent(true)
        toast.success('Successfully Requested!')
    }
    return (
        <div>
            <div className='flex justify-center space-x-2'>
                <p>ljdflsdj</p>
                <p>ljdflsdj</p>
            </div>
            <div className='grid grid-cols-3 my-8'>
                {
                    donors.map((donor, i) =>
                        <DonorCard key={i} me={me} donor={donor} />
                    )
                }
            </div>
            <div class="overflow-x-auto relative shadow-md sm:rounded-lg max-w-2xl mb-36 mx-auto">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" class="py-3 px-6">Date/Time</th>
                            <th scope="col" class="py-3 px-6">Action</th>
                            <th scope="col" class="py-3 px-6">Blood Group</th>
                            <th scope="col" class="py-3 px-6">Request</th>
                        </tr>
                    </thead>

                    {
                        visitorHistory.map((his, i) => (
                            <tbody>
                                <tr class="bg-white border-b">
                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{his.time}</th>
                                    <td class="py-4 px-6">{his.action}</td>
                                    <td class="py-4 px-6">{his.bloodType}</td>
                                    <td class="py-4 px-6"><span onClick={() => handleRequest(his)} className='bg-blue-700 px-2 py-1 text-white rounded-lg cursor-pointer'>Request Again</span></td>
                                </tr>
                            </tbody>
                        ))
                    }

                </table>
            </div>

        </div>
    )
}
export async function getServerSideProps(context) {
    const token = context.req.cookies.token;
    const donors = await (await fetch("https://lamb-backend.herokuapp.com/backend/get-all-donor", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })).json();
    const me = await (await fetch("https://lamb-backend.herokuapp.com/backend/get-user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })).json();
    const visitorHistory = await (await fetch(`https://lamb-backend.herokuapp.com/backend/get-visitor-history/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })).json();
    return {
        props: { donors, me, visitorHistory },
    };

}