import React from 'react'
import DonorCard from '../components/DonorCard'

export default function bloodbank({ donors }) {
    return (
        <div>
            <div className='flex justify-center space-x-2'>
                <p>ljdflsdj</p>
                <p>ljdflsdj</p>
            </div>
            <div className='grid grid-cols-3 my-8'>
                {
                    donors.map((donor, i) =>
                        <DonorCard key={i} donor={donor} />
                    )
                }
            </div>
        </div>
    )
}
export async function getServerSideProps({ req }) {
    console.log(req);
    const response = await fetch("https://lamb-backend.herokuapp.com/backend/get-all-donor");
    const data = await response.json();
    return {
        props: { donors: data },
    };

}