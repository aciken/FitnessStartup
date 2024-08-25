import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import GoogleLogo from '../../../Assets/Images/GoogleLogo.png'
import { SigninPop } from '../SigninPop'

import axios from 'axios'


export function SigninRoute(){







    return(
        <div className={`h-[100vh] flex flex-row justify-center items-center relative z-10 `}>

             <SigninPop  />

            
    
        </div>
    )
}