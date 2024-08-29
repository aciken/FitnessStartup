import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



import GoogleLogo from '../../../Assets/Images/GoogleLogo.png'
import { SigninPop } from '../SigninPop'

import axios from 'axios'


export function SigninRoute(){
    const navigate = useNavigate()







    return(
        <div className={`h-[100vh] flex flex-row justify-center items-center relative z-10 `}>

             <SigninPop  />
             <button onClick={() => navigate('/')} className='absolute top-2'><h1 className='text-3xl text-gray-700 font-poppins font-semibold'>Logo</h1></button>
            
    
        </div>
    )
}