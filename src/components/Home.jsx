import Image from 'next/image'
import React from 'react'
import heroImg from '../../public/heroimg.png'
import Link from 'next/link'




const Home = () => {
  return (
    <section className='w-full max-w-[1200px] relative  min-h-[95vh] flex flex-col justify-center items-center md:flex-row'>

      <div className='pt-0 px-3 flex flex-col gap-6 mb-10'>

        <h1 className='bg-gradient-to-r text-transparent bg-clip-text from-yellow-200 via-yellow-400 to-yellow-700 text-4xl lg:text-5xl xl:text-6xl'>ToDo List App</h1>
        <p className='text-gray-100 text-sm max-w-[250px] md:text-base md:max-w-[300px] lg:text-lg lg:max-w-[350px] ml-1'>Prepare your day or week in the most organized way posible</p>
         <Link href={'/dashboard'} className='border border-yellow-600 rounded-lg font-semibold text-sm md:text-base py-2 px-6 self-start transition-all duration-200 hover:bg-yellow-600 ml-1'>Get Started </Link> 
      </div>

      <div className='pb-20 '>
        <Image width={1920} blurDataURL={'../../public/heroimg.png'} placeholder='blur'  priority={true} src={heroImg}  height={1080} alt={'To do list Image'} className='w-auto h-auto md:max-w-[500px] lg:max-w-[600px]' />
        <div className='h-[150px] w-[150px] bg-yellow-300 absolute blur-[150px] bottom-5 right-0 lg:h-[300px] lg:w-[300px] lg:blur-[240px]'></div>
      </div>

    </section>
  )
}

export default Home