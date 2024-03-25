'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const cover = '/img/cover.jpeg';
    const router = useRouter();

    return (
        <div className={`block p-[5px] m-0 w-screen h-screen relative ${styles.bannerWrapper}`}>
            <Image className='object-cover h-full w-full' src={cover} alt='cover' priority fill={true}/>
            <div className='absolute bottom-24 right-16'>
                <h1 className="mb-[5px] z-20 text-left py-4 text-4xl font-medium text-zinc-100 tracking-widest">
                    <div>Discover</div>
                    <div>your smile's</div>
                    <div>perfect fit</div>
                    <div className='text-6xl tracking-normal'>with us</div>
                </h1>
                <button className='mb-[5px] bg-white text-gray-500 border-2 border-gray-500 py-2 px-5 rounded-full z-30 hover:bg-[#107557] hover:text-white hover:border-transparent' onClick={(e)=>{e.stopPropagation(); router.push('/dentist')}}>
                    Select Dentist &gt;
                </button>
            </div>
           
        </div>
    );
}