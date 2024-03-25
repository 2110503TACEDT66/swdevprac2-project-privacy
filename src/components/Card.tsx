'use client'

import Image from 'next/image'
import React from 'react';

export default function Card ({dentistName, imgSrc, dentistDesc} : {dentistName:string, imgSrc:string,dentistDesc:{dentistExp:number; dentistExpertise:string}}) {

    return (
        <div className='w-[250px] h-[340px] shadow-lg rounded-lg bg-white mb-5 hover:bg-neutral-200 hover:shadow-2xl'>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src = {imgSrc} alt='Product Picture' fill={true} className='object-cover rounded-t-lg '/>
            </div>
            <div className='flex flex-col items-center justify-center text-center w-full h-[30%] p-[10px] text-[#107557]'>
                <div className='font-semibold'>{dentistName}</div>
                <div className='text-sm'>Years of Experience: {dentistDesc.dentistExp}</div>
                <div className='text-sm'>Area of Expertise: {dentistDesc.dentistExpertise}</div>
            </div>
        </div>
    )
}