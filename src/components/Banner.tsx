'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg'];
    const [index, setIndex] = useState(0);
    const router = useRouter();

    const { data : session } = useSession();
    return (
        <div className={styles.banner} onClick={()=>{setIndex(index+1)}}>
            <Image className='object-cover' src={covers[index%4]} alt='cover' priority fill={true}/>
            <div className="relative mt-[80px] z-20 text-center bg-opacity-45 bg-cyan-50 p-4">
                <h1 className='text-4xl font-medium text-cyan-950'>Dentist Appointment</h1>
                <h3 className='text-xl font-serif text-cyan-950'>Let's come and take vaccine</h3>
            </div>
            {
                session? <div className='z-30 absolute top-5 left-5 text-yellow-50 text-xl'> Welcome {session.user.name} </div> : null
            }
            <button className='bg-white text-cyan-600 border-2 border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent' onClick={(e)=>{e.stopPropagation(); router.push('/hospital')}}>
                Select Dentist
            </button>
        </div>
    );
}