import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import FeedCard from '../components/FeedCard'

const Home: NextPage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </div>
  )
}

export default Home
