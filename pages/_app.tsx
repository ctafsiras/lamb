import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser]=useState({});
  console.log("user : ",user);
  return (
    <>
      <Navbar />
      <Component {...pageProps} user={user} setUser={setUser}/>
    </>
  )
}

export default MyApp
