import React from 'react'

export default function FeedCard() {
    return (
        <div className="w-full max-w-sm px-4 py-3 mx-auto my-4 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">B(+ve) Blood</span>
                <span className="px-3 py-1 text-sm text-blue-800 uppercase bg-blue-200 rounded-full">Dhaka</span>
            </div>

            <div>
                <h1 className="mt-2 text-lg font-semibold text-gray-800">Rounok Ahmed Tamim</h1>
                <h1 className="mt-2 text-md font-semibold text-gray-800">Square Hospital</h1>
                <p className="mt-2 text-sm text-gray-600">18 Bir Uttam Qazi Nuruzzaman Sarak West, Panthapath, Dhaka 1205</p>
            </div>

            <div>
                <div className="flex items-center mt-2 text-black">
                    <span className='text-md'>Mobile Number: 01983510532</span>
                </div>


            </div>
        </div>
    )
}
