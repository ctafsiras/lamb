import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import DonorCard from '../components/DonorCard';

export default function bloodrequest({ requests, me }) {
    const router = useRouter();
    useEffect(() => {
        if (me.role === 'ROLE_VISITOR') {
            router.push('/');
        }
    }, [])
    return (
        <div className='max-w-2xl mx-auto'>
            {/* <DonorCard /> */}
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="py-3 px-6">Date/Time</th>
                            <th scope="col" className="py-3 px-6">Action</th>
                            <th scope="col" className="py-3 px-6">Blood Group</th>
                        </tr>
                    </thead>
                    {
                        requests.map((history, index) => (
                            <tbody key={index}>
                                <tr className="bg-white border-b">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">history.time</th>
                                    <td className="py-4 px-6">history.action</td>
                                    <td className="py-4 px-6">history.bloodType</td>
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
    const me = await (await fetch("https://lamb-backend.herokuapp.com/backend/get-user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })).json();
    const data = await (await fetch(`https://lamb-backend.herokuapp.com/backend/get-all-request`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })).json();
    return {
        props: { requests: data, me },
    };

}