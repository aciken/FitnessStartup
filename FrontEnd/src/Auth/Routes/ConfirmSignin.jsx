import GoogleLogo from '../../../Assets/Images/GoogleLogo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import {useState} from 'react'

import axios from 'axios'



import { ConfirmPop } from '../ConfirmPop'


export function ConfirmSignin(){

 

    return(
        <div className={`h-[100vh] flex flex-row justify-center items-center relative z-10 `}>
            <ConfirmPop  />
    </div>  
    )
}