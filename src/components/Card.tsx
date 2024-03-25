'use client'

import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from '@mui/material';
import React, { useState } from 'react';

export default function Card ({hospitalName, imgSrc, onRating} : {hospitalName:string, imgSrc:string, onRating?:Function}) {
    
    const [value, setValue] = useState(5);

    return (
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src = {imgSrc} alt='Product Picture' fill={true} className='object-cover rounded-t-lg '/>
            </div>
            <div className='flex items-center justify-center text-center w-full h-[30%] p-[10px] text-[#107557]'>{hospitalName}</div>
            {
                onRating? <Rating id={hospitalName+" Rating"} name={hospitalName+" Rating"} data-testid={hospitalName+" Rating"} value={value} className='p-[10px]'
                onChange={(e, newValue) => {if(newValue==null) newValue=0; onRating(newValue); setValue(newValue)}} 
                onClick={(e)=>e.stopPropagation()}/> : ''
            }
            
        </InteractiveCard>
    )
}