import { CircularProgress } from '@mui/material'
import React from 'react'

function LoadingProgress({show}:{show:boolean}) {
    if(!show) return null
  return (
    <div className='absolute flex justify-center items-center w-[300px] h-[300px] bg-white shadow-2xl rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <CircularProgress size={'55px'} />
    </div>
  )
}

export default LoadingProgress