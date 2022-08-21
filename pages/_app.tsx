import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(30);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
  }, [])
  return (
    <>
      <Navbar />

      <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
