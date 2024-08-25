import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import GoogleLogo from '../../../Assets/Images/GoogleLogo.png'
import { CreateAccPop } from '../CreateAccPop'


export function CreateAccRoute() {




    return(
        <div className={`h-[100vh] flex flex-row justify-center items-center relative z-10 `}>



         <CreateAccPop />

        
       

    </div>  
    )
}