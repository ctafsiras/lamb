import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function DonorCard({ donor, me }) {
    const [modal, setModal] = useState(false);
    const [donorBloodHistory, setDonorBloodHistory] = useState([]);
    const [reqSent, setReqSent] = useState(false)
    let token = Cookies.get('token')
    useEffect(() => {
        async function loads() {
            const response = await fetch(`https://lamb-backend.herokuapp.com/backend/get-donor-history`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setDonorBloodHistory(data);
        }
        loads();
    }, [])

    const handleRequest = async () => {
        const requestData = {
            donorId: donor.userFK,
            requestId: me.userId,
            bloodType: donor.bloodType,
        }
        console.log(requestData)
        const res = await fetch("https://lamb-backend.herokuapp.com/backend/request-blood", {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestData)
        })
        const data = await res.json();
        setReqSent(true)
        toast.success('Successfully Requested!')
    }
    return (
        <div class="w-80 bg-white shadow rounded border border-transparent hover:border-blue-500 mx-auto">
            <div class="h-48 w-full checker-bg flex items-center justify-center p-4 text-blue-500">
                <div class="w-32 h-32 bg-gray-100 rounded-full bg-cover bg-center bg-[url('https://png.pngitem.com/pimgs/s/35-350426_profile-icon-png-default-profile-picture-png-transparent.png')]">
                </div>
            </div>

            <div class="p-4 border-t border-gray-200">
                <div class="flex items-center justify-between">
                    <h1 class="text-gray-600 font-medium">User fK {donor.userFK} (<span className='text-xl text-red-800'>{donor.bloodType}</span>)</h1>
                    <button
                        disabled={reqSent}
                        onClick={handleRequest}
                        class="text-white px-2 py-1 disabled:bg-blue-400 rounded-xl bg-blue-700">Request</button>
                </div>
                <div className='flex justify-between mt-2 gap-3'>
                    <p class="text-black text-md my-1">Eligibility: <span className='font-bold '>{donor.eligibility}</span></p>

                    <button onClick={() => setModal(true)} class="text-white px-2 py-1 rounded-xl bg-blue-700">
                        History
                    </button>
                </div>
            </div>
            {/* <!-- Main modal --> */}
            <div id="defaultModal" tab-index="-1" aria-hidden="true" className={`${!modal && 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
                <div className="relative p-4 w-full mx-auto max-w-2xl h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-start p-4 rounded-t border-b ">
                            <h3 className="text-xl font-semibold text-gray-900 ">{me.username}'s History</h3>
                            <button onClick={() => setModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="p-6 space-y-6">
                            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left text-gray-500">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" class="py-3 px-6">Date/Time</th>
                                            <th scope="col" class="py-3 px-6">Action</th>
                                            <th scope="col" class="py-3 px-6">Blood Group</th>
                                        </tr>
                                    </thead>
                                    {
                                        donorBloodHistory.map((history, index) => (
                                            <tbody key={index}>
                                                <tr class="bg-white border-b">
                                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{history.time}</th>
                                                    <td class="py-4 px-6">{history.action}</td>
                                                    <td class="py-4 px-6">{history.bloodType}</td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </table>
                            </div>



                        </div>
                        {/* <!-- Modal footer --> */}
                        <div onClick={() => setModal(false)} className="flex flex-row-reverse items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                            <button data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
