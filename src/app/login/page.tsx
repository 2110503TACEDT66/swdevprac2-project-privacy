'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


function LoginPage() {
  const router = useRouter();
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('')
  const [error,setError] = useState<string>('')

  const handlerSubmit = async(e:any)=>{
    try {

        e.preventDefault();
        if(!email){
            setError("Please Enter your Email")
            return;
        }
        if(!password){
            setError("Please Enter your Password")
            return;
        }
        
        const res = await signIn('credentials',{email,password,redirect:false})
        if(res?.error){
            setError("Invalid credentials")
            return;
        }
        console.log("going to router");
        
        router.push('/')
        
    } catch (error) {
        console.log("Error from login" + error);
    }
  }
  return (
    <div className='container mx-auto flex flex-col justify-center items-center h-screen '>
        <form onSubmit={handlerSubmit} className='flex flex-col items-center w-fit h-fit px-2 py-3 rounded-md bg-gray-500 shadow-md'>
            <input onChange={(e)=>setEmail(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="email" placeholder='Enter your email' />
            <input onChange={(e)=>setPassword(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="password" placeholder='Enter your password'/>
            <button type="submit" className='my-2 w-full bg-green-500 p-2 rounded-md text-white'>Login</button>
            {error && (
                <div className=' text-center bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                    {error}
                </div>
            )}
        </form>
    </div>
  )
}

export default LoginPage