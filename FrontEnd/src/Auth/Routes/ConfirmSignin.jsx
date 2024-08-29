import GoogleLogo from '../../../Assets/Images/GoogleLogo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import {useState} from 'react'

import axios from 'axios'



import { ConfirmPop } from '../ConfirmPop'


export function ConfirmSignin(){
    const navigate = useNavigate()

 

    return(
        <div className={`h-[100vh] flex flex-row justify-center items-center relative z-10 `}>
            <ConfirmPop  />
            <button onClick={() => navigate('/')} className='absolute top-2'><h1 className='text-3xl text-gray-700 font-poppins font-semibold'>Logo</h1></button>
    </div>  
    )
}