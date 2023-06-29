import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Banner from '@/components/Banner'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Immodata</title>
      </Head>

      <div className="bg-[url('/img/banner.png')] ">
        <Header />
        <Banner />
      </div>
    </>
  )
}


