import React from 'react'

export default function bloodrequest({requests}) {
    return (
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
                    requests.map((history, index) => (
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
    )
}
export async function getServerSideProps() {
    const data = await (await fetch(`https://lamb-backend.herokuapp.com/backend/get-all-request/${14}`)).json();
    return {
      props: { requests: data },
    };
  
  }